package com.vmo.movieapp.repository;

import com.vmo.movieapp.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    List<Feedback> findAllByMovieId(Long movieId);
}
