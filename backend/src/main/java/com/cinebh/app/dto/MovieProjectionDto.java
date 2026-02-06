package com.cinebh.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieProjectionDto {
    private UUID id;
    private LocalDate projectionDate;
    private LocalTime projectionTime;
    private CinemaHallDto cinemaHall;
    private UUID cinemaHallId;
}
