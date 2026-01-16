package com.cinebh.app.mapper;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.entity.HallSeat;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SeatTypeMapper.class, CinemaHallMapper.class})
public interface HallSeatMapper {

    HallSeatDto toDto(HallSeat hallSeat);
}
