package com.cinebh.app.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String email;
    private List<String> roles;
    private Boolean success;
    private String message;
}
