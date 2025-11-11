package com.cinebh.app.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDto {
    private UUID id;
    private String name;
    private String iso2Code;
}
