package com.cinebh.app.service;

import com.cinebh.app.dto.PaginatedResponse;
import com.cinebh.app.dto.VenueResponse;
import org.springframework.data.domain.Pageable;

public interface VenueService {

    PaginatedResponse<VenueResponse> getAllVenues(Pageable pageable);
}
