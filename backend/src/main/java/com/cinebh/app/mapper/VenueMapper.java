package com.cinebh.app.mapper;

import com.cinebh.app.dto.VenueDto;
import com.cinebh.app.entity.Venue;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface VenueMapper {

    VenueDto toDto(Venue venue);
}
