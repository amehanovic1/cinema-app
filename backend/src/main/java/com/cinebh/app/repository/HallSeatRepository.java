package com.cinebh.app.repository;

import com.cinebh.app.entity.HallSeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HallSeatRepository extends JpaRepository<HallSeat, UUID> {

    List<HallSeat> findByCinemaHallId(UUID cinemaHallId);
}
