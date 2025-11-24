package com.cinebh.app.service.impl;

import com.cinebh.app.dto.PageDto;
import com.cinebh.app.dto.VenueDto;
import com.cinebh.app.entity.Venue;
import com.cinebh.app.mapper.VenueMapper;
import com.cinebh.app.repository.VenueRepository;
import com.cinebh.app.service.VenueService;
import com.cinebh.app.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VenueServiceImpl implements VenueService {

    private final VenueRepository venueRepository;
    private final VenueMapper venueMapper;

    @Override
    public PageDto<VenueDto> getAllVenues(Pageable pageable) {
        Page<Venue> page = venueRepository.findAll(pageable);
        return PaginationUtil.buildPaginatedResponse(page.map(venueMapper::toDto));
    }

    @Override
    public List<VenueDto> getVenuesByCityName(String cityName) {
        return venueRepository.findByCity_Name(cityName)
                .stream()
                .map(venueMapper::toDto)
                .toList();
    }
}
