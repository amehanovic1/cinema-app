package com.cinebh.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie extends Auditable {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "language")
    private String language;

    @Column(name = "projection_start_date")
    private LocalDate projectionStartDate;

    @Column(name = "projection_end_date")
    private LocalDate projectionEndDate;

    @Column(name = "director_full_name")
    private String directorFullName;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "pg_rating")
    private String pgRating;

    @Column(name = "duration_in_minutes")
    private Integer durationInMinutes;

    @Column(name = "trailer_url")
    private String trailerUrl;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MovieImage> images = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MovieProjection> projections = new HashSet<>();
}
