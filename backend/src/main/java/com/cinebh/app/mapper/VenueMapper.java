package com.cinebh.app.mapper;

import com.cinebh.app.dto.VenueResponse;
import com.cinebh.app.entity.Venue;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface VenueMapper {

    VenueResponse toResponse(Venue venue);
}
