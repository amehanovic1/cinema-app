package com.cinebh.app.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private UUID id;
    private String title;
    private String language;
    private LocalDate projectionStartDate;
    private LocalDate projectionEndDate;
    private String directorFullName;
    private String synopsis;
    private String pgRating;
    private Integer durationInMinutes;
    private String trailerUrl;

    private List<String> venues;
    private List<GenreDto> genres;
    private List<MovieImageDto> images;
    private List<MovieRatingDto> ratings;
    private List<MovieCastDto> cast;
    private List<MovieWriterDto> writers;
}
