package com.cinebh.app.repository;

import com.cinebh.app.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    @Query("SELECT t.hallSeat.id FROM Ticket t WHERE t.projection.id = :projectionId")
    List<UUID> findAllSeatIdsByProjectionId(UUID projectionId);

    Optional<Ticket> findByBookingIdAndHallSeatIdAndProjectionId(UUID bookingId, UUID hallSeatId, UUID projectionId);
}
