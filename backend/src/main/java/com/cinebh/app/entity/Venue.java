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
@Table(name = "venues")
public class Venue extends Auditable {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "street")
    private String street;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "phone")
    private String phone;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CinemaHall> cinemaHalls = new HashSet<>();
}
