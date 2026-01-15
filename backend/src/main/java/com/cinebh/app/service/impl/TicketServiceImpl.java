package com.cinebh.app.service.impl;

import com.cinebh.app.repository.TicketRepository;
import com.cinebh.app.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    @Override
    public List<UUID> getReservedSeatsForProjection(UUID projectionId) {
        return ticketRepository.findAllSeatIdsByProjectionId(projectionId);
    }
}
