package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MovieProjectionRepository extends JpaRepository<MovieProjection, UUID> {

    @Query("SELECT mp FROM MovieProjection mp JOIN mp.movie m WHERE m.id = :movieId AND mp.projectionDate = :projectionDate")
    List<MovieProjection> findByMovieIdAndProjectionDate(@Param("movieId") UUID movieId, @Param("projectionDate") LocalDate projectionDate);
}
