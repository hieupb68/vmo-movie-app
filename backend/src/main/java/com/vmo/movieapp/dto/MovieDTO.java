package com.vmo.movieapp.dto;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieDTO {
    public int id;
    public String title;
    public String director;
    public int year;
    public String url;
    public String image;
    public String description;
    public List<String> types;
}
