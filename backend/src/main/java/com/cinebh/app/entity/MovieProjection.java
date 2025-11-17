package com.cinebh.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movie_projections")
public class MovieProjection extends Auditable {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "projection_date")
    private LocalDate projectionDate;

    @Column(name = "projection_time")
    private LocalTime projectionTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_hall_id")
    private CinemaHall cinemaHall;
}
