package com.cinebh.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDraftDto {
    private UUID id;
    private String step;

    private String title;
    private String language;
    private LocalDate projectionStartDate;
    private LocalDate projectionEndDate;
    private String directorFullName;
    private String synopsis;
    private String pgRating;
    private Integer durationInMinutes;
    private String trailerUrl;

    private List<UUID> genres;
    private List<MovieImageDto> images;
    private List<MovieRatingDto> ratings;
    private List<MovieProjectionDto> projections;
    private List<MovieCastDto> cast;
    private List<MovieWriterDto> writers;
}
