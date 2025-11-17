package com.cinebh.app.service;

import com.cinebh.app.dto.MovieProjectionDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MovieProjectionService {

    List<MovieProjectionDto> getByMovieIdAndProjectionDate(UUID movieId, LocalDate projectionDate);
}
