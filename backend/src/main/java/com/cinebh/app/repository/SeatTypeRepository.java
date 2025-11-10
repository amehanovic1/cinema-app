package com.cinebh.app.repository;

import com.cinebh.app.entity.SeatType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SeatTypeRepository extends JpaRepository<SeatType, UUID> {
}
