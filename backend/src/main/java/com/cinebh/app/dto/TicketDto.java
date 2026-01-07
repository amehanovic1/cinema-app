package com.cinebh.app.dto;

import com.cinebh.app.dto.booking.BookingDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private UUID id;
    private MovieProjectionDto projection;
    private HallSeatDto hallSeat;
    private BookingDto booking;
}
