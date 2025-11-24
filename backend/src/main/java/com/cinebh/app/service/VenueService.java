package com.cinebh.app.service;

import com.cinebh.app.dto.PageDto;
import com.cinebh.app.dto.VenueDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VenueService {

    PageDto<VenueDto> getAllVenues(Pageable pageable);

    List<VenueDto> getVenuesByCityName(String cityName);
}
