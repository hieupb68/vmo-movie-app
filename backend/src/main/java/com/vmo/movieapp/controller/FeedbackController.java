package com.vmo.movieapp.controller;


import com.vmo.movieapp.dto.FeedbackDTO;
import com.vmo.movieapp.dto.NewFeedback;
import com.vmo.movieapp.entity.Feedback;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.vmo.movieapp.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping("/add")
    public void addFeedback(@RequestBody NewFeedback newFeedback) {
        feedbackService.addFeedback(newFeedback);
    }

    @GetMapping("/get")
    public List<FeedbackDTO> getFeedback(@RequestParam Long filmId){
        return feedbackService.getFeedback(filmId);
    }
}
