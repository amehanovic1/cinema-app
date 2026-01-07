package com.cinebh.app.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDto {
    private UUID userId;
    private UUID projectionId;
    private List<UUID> hallSeatsId;
    private String status;
}
