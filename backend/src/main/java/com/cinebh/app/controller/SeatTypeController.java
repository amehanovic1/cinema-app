package com.cinebh.app.controller;

import com.cinebh.app.dto.PaginatedResponse;
import com.cinebh.app.dto.SeatTypeResponse;
import com.cinebh.app.service.impl.SeatTypeServiceImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seat-types")
public class SeatTypeController {

    private final SeatTypeServiceImpl seatTypeService;

    public SeatTypeController(SeatTypeServiceImpl seatTypeService) {
        this.seatTypeService = seatTypeService;
    }

    @GetMapping
    public PaginatedResponse<SeatTypeResponse> getAllSeatTypes(
            @PageableDefault(page = 0, size = 5, sort = "name", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return seatTypeService.getAllSeatTypes(pageable);
    }
}
