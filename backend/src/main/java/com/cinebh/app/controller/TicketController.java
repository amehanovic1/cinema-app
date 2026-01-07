package com.cinebh.app.controller;

import com.cinebh.app.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/reserved-seats/{projectionId}")
    public List<UUID> getReservedSeatsForProjection(@PathVariable UUID projectionId) {
        return ticketService.getReservedSeatsForProjection(projectionId);
    }
}
