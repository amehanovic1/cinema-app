package com.cinebh.app.entity;

import com.cinebh.app.enums.MovieRoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movie_cast")
public class MovieCast extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "character_full_name", nullable = false)
    private String characterFullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private MovieRoleType role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

}
