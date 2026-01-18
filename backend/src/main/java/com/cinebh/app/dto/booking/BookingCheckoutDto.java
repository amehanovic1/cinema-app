package com.cinebh.app.dto.booking;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.dto.MovieProjectionDetailsDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class BookingCheckoutDto {
    private UUID id;
    private LocalDateTime expiresAt;
    private Long remainingSeconds;
    private MovieProjectionDetailsDto projectionDetails;
    private List<HallSeatDto> selectedSeats;
    private Double totalPrice;
}
