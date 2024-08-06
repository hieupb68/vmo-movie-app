package com.vmo.movieapp.dto;

import com.vmo.movieapp.entity.Movie;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewFeedback {
    private int vote;
    private String comment;
    private Long movieId;
}
