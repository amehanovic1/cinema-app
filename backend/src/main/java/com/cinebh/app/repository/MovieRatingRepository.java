package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieRatingRepository extends JpaRepository<MovieRating, UUID> {
}
