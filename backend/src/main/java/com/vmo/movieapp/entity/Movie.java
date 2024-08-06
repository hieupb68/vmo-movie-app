package com.vmo.movieapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String title;

    public String director;

    public int year;

    public String url;

    public String image;

    public String description;

    @ManyToMany
    public List<Type> types;
}
 