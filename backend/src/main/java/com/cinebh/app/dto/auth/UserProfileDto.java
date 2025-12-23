package com.cinebh.app.dto.auth;

import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Set<String> roles;
}
