package com.cinebh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HallSeatDto {
    private UUID id;
    private String seatCode;
    private SeatTypeDto seatType;
}
