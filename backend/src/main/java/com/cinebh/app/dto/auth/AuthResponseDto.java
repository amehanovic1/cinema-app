package com.cinebh.app.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private Boolean isVerified;
    private Boolean success;
    private String message;
    private String errorCode;
}
