package com.cinebh.app.mapper;

import com.cinebh.app.dto.CinemaHallDto;
import com.cinebh.app.entity.CinemaHall;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {VenueMapper.class})
public interface CinemaHallMapper {

    CinemaHallDto toDto(CinemaHall cinemaHall);
}
