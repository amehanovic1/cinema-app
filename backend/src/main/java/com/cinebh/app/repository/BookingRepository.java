package com.cinebh.app.repository;

import com.cinebh.app.entity.Booking;
import com.cinebh.app.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    @Query("SELECT DISTINCT b FROM Booking b JOIN b.tickets t JOIN t.projection mp " +
            "WHERE b.status = :status AND (mp.projectionDate < :date " +
            "OR (mp.projectionDate = :date AND mp.projectionTime <= :time ))"
    )
    List<Booking> findExpiredReservations(BookingStatus status, LocalDate date, LocalTime time);
}
