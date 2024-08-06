package com.vmo.movieapp.dto;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateMovieDTO {
    private Long id;
    private String title;
    private int year;
    private String director;
    private String url;
    private String image;
    private String description;
    private List<Integer> typeIds;
}
