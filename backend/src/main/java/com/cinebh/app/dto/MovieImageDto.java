package com.cinebh.app.dto;

import com.cinebh.app.enums.ImageType;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieImageDto {
    private UUID id;
    private String url;
    private ImageType type;
}
