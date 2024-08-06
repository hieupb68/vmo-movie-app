package com.vmo.movieapp.service;


import com.vmo.movieapp.dto.FeedbackDTO;
import com.vmo.movieapp.dto.NewFeedback;
import com.vmo.movieapp.entity.BlackList;
import com.vmo.movieapp.entity.Feedback;
import com.vmo.movieapp.entity.Movie;
import com.vmo.movieapp.entity.User;
import com.vmo.movieapp.repository.BlackListRepository;
import com.vmo.movieapp.repository.FeedbackRepository;
import com.vmo.movieapp.repository.MovieRepository;
import com.vmo.movieapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final BlackListRepository blackListRepository;
    private final MovieRepository movieRepository;

    public void addFeedback(NewFeedback newFeedback) {
        Movie movie = movieRepository.findById(newFeedback.getMovieId()).orElseThrow();

        Feedback feedback = new Feedback();
        feedback.setComment(newFeedback.getComment());
        feedback.setVote(newFeedback.getVote());
        feedback.setMovie(movie);

        var userDaDangNhap = (org.springframework.security.core.userdetails.UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userDaDangNhap.getUsername();
        User user = userRepository.findById(Long.parseLong(userId)).get();
        feedback.setUser(user);

        List<BlackList> blackLists = blackListRepository.findAll();
        for (BlackList blackList : blackLists) {
            if (feedback.getComment().toLowerCase().contains(blackList.getText().toLowerCase())) {
                feedback.setCommentBan(true);
            }
        }

        feedbackRepository.save(feedback);
    }

    public List<FeedbackDTO> getFeedback(Long filmId) {
        List<Feedback> feedbacks = feedbackRepository.findAllByMovieId(filmId);
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();

        for (Feedback feedback: feedbacks) {
            FeedbackDTO feedbackDTO = new FeedbackDTO();
            feedbackDTO.setComment(feedback.getComment());
            feedbackDTO.setUser(feedback.getUser());
            feedbackDTO.setVote(feedback.getVote());

            feedbackDTOList.add(feedbackDTO);
        }
        return feedbackDTOList;
    }
}

