package com.cinebh.app.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VenueResponse {
    private UUID id;
    private String name;
    private String street;
    private String streetNumber;
    private String phone;
    private String imageUrl;
    private CityResponse city;
}
