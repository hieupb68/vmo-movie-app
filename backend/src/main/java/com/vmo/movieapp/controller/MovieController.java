package com.vmo.movieapp.controller;

import com.vmo.movieapp.dto.MovieDTO;
import com.vmo.movieapp.dto.NewMovie;
import com.vmo.movieapp.dto.UpdateMovieDTO;
import com.vmo.movieapp.entity.Type;
import com.vmo.movieapp.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("/add")
    public void addMovie(@RequestBody NewMovie newMovie) {
        movieService.addMovie(newMovie);
    }

    @GetMapping("/get")
    public Page<MovieDTO> getALlMovie(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false, defaultValue = "0") int typeId,
        @RequestParam(required = false, defaultValue = "1") int page
    ) {
        page = page - 1;
        return movieService.getAllMovie(keyword, typeId, page);
    }
    @GetMapping("/getAll")
    public List<MovieDTO> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/getById")
    public MovieDTO getById(@RequestParam Long id) {
        return movieService.getById(id);
    }
    @PutMapping("/update/{id}")
    public void updateMovie(@PathVariable Long id, @RequestBody UpdateMovieDTO updateMovieDTO) {
        movieService.updateMovie(id, updateMovieDTO);
    }


    // endpoint lọc: /get/::params (params có thể là tên, đạo diễn, năm, thể loại, vv)
}
