package com.cinebh.app.controller;

import com.cinebh.app.dto.PaginatedResponse;
import com.cinebh.app.dto.VenueResponse;
import com.cinebh.app.service.impl.VenueServiceImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    private final VenueServiceImpl venueService;

    public VenueController(VenueServiceImpl venueServiceImpl) {
        this.venueService = venueServiceImpl;
    }

    @GetMapping
    public PaginatedResponse<VenueResponse> getAllVenues(
            @PageableDefault(page = 0, size = 5, sort = "name", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return venueService.getAllVenues(pageable);
    }
}
