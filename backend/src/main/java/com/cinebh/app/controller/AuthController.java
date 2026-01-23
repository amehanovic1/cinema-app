package com.cinebh.app.controller;

import com.cinebh.app.dto.auth.*;
import com.cinebh.app.entity.Role;
import com.cinebh.app.entity.User;
import com.cinebh.app.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

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
        AuthResponseDto response = authenticationService.verify(request);
        return response.getSuccess()
                ? ResponseEntity.ok(response)
                : ResponseEntity.badRequest().body(response);
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
        AuthResponseDto authResponse = authenticationService.refresh(request, response);
        if (!authResponse.getSuccess()) {
            return ResponseEntity.status(401).body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponseDto> logout (
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.logout(request, response));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile (@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                new UserProfileDto(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getRoles().stream().map(Role::getName).collect(Collectors.toSet())
                )
        );
    }
}
