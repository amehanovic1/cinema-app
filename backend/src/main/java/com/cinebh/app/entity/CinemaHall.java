package com.cinebh.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cinema_halls")
public class CinemaHall extends Auditable {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id")
    private Venue venue;

    @OneToMany(mappedBy = "cinemaHall", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MovieProjection> projections = new HashSet<>();
}
