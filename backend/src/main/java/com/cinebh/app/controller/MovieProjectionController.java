package com.cinebh.app.controller;

import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.service.MovieProjectionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/movie-projections")
public class MovieProjectionController {

    private final MovieProjectionService movieProjectionService;

    public MovieProjectionController(MovieProjectionService movieProjectionService) {
        this.movieProjectionService = movieProjectionService;
    }

    @GetMapping
    public ResponseEntity<List<MovieProjectionDto>> getProjectionsByFilter(
            @RequestParam UUID movieId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate projectionDate,
            @RequestParam(required = false) String venue
            ) {
        return ResponseEntity.ok(movieProjectionService.getProjectionsByFilter(
                movieId, projectionDate, venue
                )
        );
    }
}
