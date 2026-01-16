package com.cinebh.app.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequestDto {
    private UUID bookingId;
    private UUID seatId;
    private UUID projectionId;
}
