package com.cinebh.app.controller;

import com.cinebh.app.dto.SeatTypeDto;
import com.cinebh.app.service.SeatTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seat-types")
public class SeatTypeController {

    private final SeatTypeService seatTypeService;

    public SeatTypeController(SeatTypeService seatTypeService) {
        this.seatTypeService = seatTypeService;
    }

    @GetMapping
    public ResponseEntity<List<SeatTypeDto>> getAllSeatTypes() {
        return ResponseEntity.ok(seatTypeService.getAllSeatTypes());
    }
}
