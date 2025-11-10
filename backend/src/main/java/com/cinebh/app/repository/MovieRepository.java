package com.cinebh.app.repository;

import com.cinebh.app.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface MovieRepository extends JpaRepository<Movie, UUID> {

    Page<Movie> findByProjectionStartDateAfter(LocalDate date, Pageable pageable);

    @Query("SELECT m FROM Movie m WHERE m.projectionStartDate <= :today AND m.projectionEndDate >= :today")
    Page<Movie> findCurrentlyShowing(@Param("today") LocalDate today, Pageable pageable);
}
