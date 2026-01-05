package com.cinebh.app.repository;

import com.cinebh.app.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    List<Ticket> findByProjectionId(UUID projectionId);
}
