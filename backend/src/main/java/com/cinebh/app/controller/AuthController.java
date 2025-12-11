package com.cinebh.app.controller;

import com.cinebh.app.dto.auth.*;
import com.cinebh.app.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final RefreshTokenServiceImpl refreshTokenService;
    private final JwtServiceImpl jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register (
            @Valid @RequestBody RegisterRequestDto request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponseDto> verify (
            @Valid @RequestBody VerifyRequestDto request
    ) {
        return ResponseEntity.ok(authenticationService.verify(request));
    }

    @PostMapping("/resend-code")
    public ResponseEntity<AuthResponseDto> resendCode(
            @Valid @RequestBody EmailRequestDto request)
    {
        return ResponseEntity.ok(authenticationService.resendCode(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login (
            @RequestBody LoginRequestDto request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.login(request, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshToken (
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.refresh(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponseDto> logout (
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.logout(request, response));
    }
}
