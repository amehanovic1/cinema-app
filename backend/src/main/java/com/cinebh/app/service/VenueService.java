package com.cinebh.app.service;

import com.cinebh.app.dto.PageDto;
import com.cinebh.app.dto.VenueDto;
import org.springframework.data.domain.Pageable;

public interface VenueService {

    PageDto<VenueDto> getAllVenues(Pageable pageable);
}
