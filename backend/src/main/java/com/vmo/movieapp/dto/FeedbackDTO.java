package com.vmo.movieapp.dto;

import com.vmo.movieapp.entity.Movie;
import com.vmo.movieapp.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackDTO {
    private int vote;
    private String comment;
    User user;
    Movie movie;
}
