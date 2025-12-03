package com.cinebh.app.service;

import com.cinebh.app.dto.auth.AuthResponseDto;
import com.cinebh.app.dto.auth.RegisterRequestDto;

public interface AuthenticationService {

    AuthResponseDto register(RegisterRequestDto request);
}
