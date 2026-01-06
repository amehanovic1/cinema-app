package com.cinebh.app.dto;

import com.cinebh.app.enums.MovieRoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieCastDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String characterFullName;
    private MovieRoleType role;
}
