package com.cinebh.app.mapper;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.dto.booking.BookingCheckoutDto;
import com.cinebh.app.dto.booking.BookingDto;
import com.cinebh.app.entity.Booking;
import com.cinebh.app.entity.MovieProjection;
import com.cinebh.app.entity.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring",
        uses = {
        SeatTypeMapper.class,
        UserMapper.class,
        MovieProjectionMapper.class,
        HallSeatMapper.class})
public interface BookingMapper {

    BookingDto toDto(Booking booking);

    @Mapping(target = "id", source = "booking.id")
    @Mapping(target = "projectionDetails", source = "projection")
    @Mapping(target = "selectedSeats", source = "booking.tickets")
    @Mapping(target = "totalPrice", source = "booking", qualifiedByName = "mapPrice")
    @Mapping(target = "remainingSeconds", ignore = true)
    BookingCheckoutDto toCheckoutDto(Booking booking, MovieProjection projection);

    @Mapping(target = "id", source = "hallSeat.id")
    @Mapping(target = "seatCode", source = "hallSeat.seatCode")
    @Mapping(target = "seatType", source = "hallSeat.seatType")
    HallSeatDto ticketToHallSeatDto(Ticket ticket);

    @Named("mapPrice")
    default Double mapPrice(Booking booking) {
        if (booking == null || booking.getTickets() == null) return 0.0;
        return booking.getTickets().stream()
                .filter(t -> t.getHallSeat() != null && t.getHallSeat().getSeatType() != null)
                .mapToDouble(t -> t.getHallSeat().getSeatType().getPrice())
                .sum();
    }
}
