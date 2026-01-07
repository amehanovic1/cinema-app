package com.cinebh.app.dto.booking;

import com.cinebh.app.dto.UserDto;
import com.cinebh.app.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private UUID id;
    private Integer ticketCount;
    private BookingStatus status;
    private UserDto user;
}
