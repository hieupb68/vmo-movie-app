package com.vmo.movieapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewMovie {
    private String title;
    private String director;
    private int year;
    private String url;
    private String image;
    private String description;
    private List<Integer> typeIds;
}
