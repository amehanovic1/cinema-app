package com.cinebh.app.controller;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.service.HallSeatService;
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

    public HallSeatController(HallSeatService hallSeatService) {
        this.hallSeatService = hallSeatService;
    }

    @GetMapping("/{hallId}")
    public List<HallSeatDto> getCinemaHallSeats(@PathVariable UUID hallId) {
        return hallSeatService.getSeatsByHall(hallId);
    }
}
