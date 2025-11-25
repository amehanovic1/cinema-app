package com.cinebh.app.controller;

import com.cinebh.app.dto.PageDto;
import com.cinebh.app.dto.VenueDto;
import com.cinebh.app.service.VenueService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping
    public PageDto<VenueDto> getAllVenues(
            @PageableDefault(page = 0, size = 5, sort = "name", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return venueService.getAllVenues(pageable);
    }

    @GetMapping("/by-city")
    public ResponseEntity<List<VenueDto>> getVenuesByCityId(@RequestParam UUID cityId) {
        return ResponseEntity.ok(venueService.getVenuesByCityId(cityId));
    }
}
