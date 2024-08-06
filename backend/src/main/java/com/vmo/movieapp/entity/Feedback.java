package com.vmo.movieapp.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int vote;
    private String comment;
    private boolean commentBan;
    @ManyToOne
    public User user;
    @ManyToOne
    public Movie movie;
}
