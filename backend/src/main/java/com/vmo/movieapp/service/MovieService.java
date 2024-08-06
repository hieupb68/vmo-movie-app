package com.vmo.movieapp.service;

import com.vmo.movieapp.dto.MovieDTO;
import com.vmo.movieapp.dto.NewMovie;
import com.vmo.movieapp.dto.UpdateMovieDTO;
import com.vmo.movieapp.entity.Movie;
import com.vmo.movieapp.entity.Type;
import com.vmo.movieapp.repository.MovieRepository;
import com.vmo.movieapp.repository.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final TypeRepository typeRepository;

    public void addMovie(NewMovie newMovie) {
        Movie movie = new Movie();
        movie.setTitle(newMovie.getTitle());
        movie.setYear(newMovie.getYear());
        movie.setDirector(newMovie.getDirector());
        movie.setUrl(newMovie.getUrl());
        movie.setImage(newMovie.getImage());
        movie.setDescription(newMovie.getDescription());

        List<Type> typeList = new ArrayList<>();
        for (Integer id : newMovie.getTypeIds()) {
            Type type = new Type();
            type.setId(id);
            typeList.add(type);
        }
        movie.setTypes(typeList);

        movieRepository.save(movie);
    }

    public Page<MovieDTO> getAllMovie(String keyword, int typeId, int page) {
        Type t = new Type();
        t.setId(typeId);
        if (typeId == 0) {
            t = null;
        }

        Page<Movie> movies = movieRepository.findAllByKeywordAndType(keyword, t, Pageable.ofSize(12).withPage(page));

        return movies.map(movie -> {
            MovieDTO movieDTO = new MovieDTO();
            movieDTO.setId(movie.getId());
            movieDTO.setDescription(movie.getDescription());
            movieDTO.setDirector(movie.getDirector());
            movieDTO.setImage(movie.getImage());
            movieDTO.setTitle(movie.getTitle());
            movieDTO.setUrl(movie.getUrl());
            movieDTO.setYear(movie.getYear());

            List<String> typeList = new ArrayList<>();
            for (Type type : movie.getTypes()) {
                String name = type.getName();
                typeList.add(name);
            }
            movieDTO.setTypes(typeList);

            return movieDTO;
        });
    }

    public List<MovieDTO> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream().map(movie -> {
            MovieDTO movieDTO = new MovieDTO();
            movieDTO.setId(movie.getId());
            movieDTO.setDescription(movie.getDescription());
            movieDTO.setDirector(movie.getDirector());
            movieDTO.setImage(movie.getImage());
            movieDTO.setTitle(movie.getTitle());
            movieDTO.setUrl(movie.getUrl());
            movieDTO.setYear(movie.getYear());

            List<String> typeList = new ArrayList<>();
            for (Type type : movie.getTypes()) {
                String name = type.getName();
                typeList.add(name);
            }
            movieDTO.setTypes(typeList);

            return movieDTO;
        }).collect(Collectors.toList());
    }

    public MovieDTO getById(Long id) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setId(movie.getId());
        movieDTO.setDescription(movie.getDescription());
        movieDTO.setDirector(movie.getDirector());
        movieDTO.setImage(movie.getImage());
        movieDTO.setTitle(movie.getTitle());
        movieDTO.setUrl(movie.getUrl());
        movieDTO.setYear(movie.getYear());

        List<String> typeList = new ArrayList<>();
        for (Type type : movie.getTypes()) {
            String name = type.getName();
            typeList.add(name);
        }
        movieDTO.setTypes(typeList);
        return movieDTO;
    }

    public void updateMovie(Long id, UpdateMovieDTO updateMovieDTO) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));

        movie.setTitle(updateMovieDTO.getTitle());
        movie.setYear(updateMovieDTO.getYear());
        movie.setDirector(updateMovieDTO.getDirector());
        movie.setUrl(updateMovieDTO.getUrl());
        movie.setImage(updateMovieDTO.getImage());
        movie.setDescription(updateMovieDTO.getDescription());

        movieRepository.save(movie);
    }
}
