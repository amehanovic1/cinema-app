package com.cinebh.app.service;

import com.cinebh.app.dto.MovieProjectionDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MovieProjectionService {

    List<MovieProjectionDto> filterMovieProjections(
            UUID movieId, LocalDate projectionDate, UUID venueId);
}
