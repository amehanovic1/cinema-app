package com.cinebh.app.dto;

import com.cinebh.app.entity.Auditable;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryResponse {
    private UUID id;
    private String name;
}
