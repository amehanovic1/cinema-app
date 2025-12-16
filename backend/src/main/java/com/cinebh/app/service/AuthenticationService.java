package com.cinebh.app.service;

import com.cinebh.app.dto.auth.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    AuthResponseDto register(RegisterRequestDto request);

    AuthResponseDto verify(VerifyRequestDto verifyRequestDto);

    AuthResponseDto resendCode(EmailRequestDto request);

    AuthResponseDto login(LoginRequestDto request, HttpServletResponse response);

    AuthResponseDto refresh(HttpServletRequest request, HttpServletResponse response);

    AuthResponseDto logout(HttpServletRequest request, HttpServletResponse response);
}
