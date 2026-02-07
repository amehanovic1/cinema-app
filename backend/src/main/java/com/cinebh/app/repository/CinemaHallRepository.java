package com.cinebh.app.repository;

import com.cinebh.app.entity.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CinemaHallRepository extends JpaRepository<CinemaHall, UUID> {

    Optional<CinemaHall> findFirstByVenueIdOrderByNameAsc(UUID venueId);
}
