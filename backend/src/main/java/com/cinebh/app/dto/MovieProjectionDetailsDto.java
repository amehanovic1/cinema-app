package com.cinebh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieProjectionDetailsDto {
    private UUID id;
    private LocalDate projectionDate;
    private LocalTime projectionTime;

    private String title;
    private String pgRating;
    private String language;
    private Integer durationInMinutes;
    private String posterUrl;

    private CinemaHallDto cinemaHall;
}
