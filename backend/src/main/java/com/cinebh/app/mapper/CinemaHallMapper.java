package com.cinebh.app.mapper;

import com.cinebh.app.dto.CinemaHallDto;
import com.cinebh.app.entity.CinemaHall;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {VenueMapper.class})
public interface CinemaHallMapper {

    @Mapping(source = "venue", target = "venueDto")
    CinemaHallDto toDto(CinemaHall cinemaHall);
}
