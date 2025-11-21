package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MovieProjectionRepository extends JpaRepository<MovieProjection, UUID> {

    @Query(value = "SELECT DISTINCT ON (mp.projection_time) * " +
                    "FROM movie_projections mp " +
                    "WHERE mp.movie_id = :movieId AND mp.projection_date = :projectionDate " +
                    "ORDER BY mp.projection_time",
            nativeQuery = true)
    List<MovieProjection> findByMovieIdAndProjectionDate(@Param("movieId") UUID movieId, @Param("projectionDate") LocalDate projectionDate);
}
