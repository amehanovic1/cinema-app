package com.cinebh.app.mapper;

import com.cinebh.app.dto.TicketDto;
import com.cinebh.app.entity.Ticket;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {MovieProjectionMapper.class, HallSeatMapper.class, BookingMapper.class
        })
public interface TicketMapper {

    TicketDto toDto(Ticket ticket);
}
