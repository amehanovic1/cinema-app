package com.cinebh.app.controller;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.service.HallSeatService;
import com.cinebh.app.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hall-seats")
public class HallSeatController {

    private final HallSeatService hallSeatService;
    private final TicketService ticketService;

    public HallSeatController(HallSeatService hallSeatService, TicketService ticketService) {
        this.hallSeatService = hallSeatService;
        this.ticketService = ticketService;
    }

    @GetMapping("/{hallId}")
    public List<HallSeatDto> getCinemaHallSeats(@PathVariable UUID hallId) {
        return hallSeatService.getSeatsByHall(hallId);
    }

    @GetMapping("/reserved/{projectionId}")
    public List<UUID> getReservedSeatsForProjection(@PathVariable UUID projectionId) {
        return ticketService.getReservedSeatsForProjection(projectionId);
    }
}
