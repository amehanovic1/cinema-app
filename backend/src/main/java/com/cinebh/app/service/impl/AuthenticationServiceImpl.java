package com.cinebh.app.service.impl;

import com.cinebh.app.dto.auth.AuthResponseDto;
import com.cinebh.app.dto.auth.RegisterRequestDto;
import com.cinebh.app.entity.Role;
import com.cinebh.app.entity.User;
import com.cinebh.app.repository.RoleRepository;
import com.cinebh.app.repository.UserRepository;
import com.cinebh.app.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isPresent()) {
            return AuthResponseDto.builder()
                    .message("Account with this email already exists!")
                    .success(false)
                    .build();
        }

        Role customerRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: USER role not found!"));

        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>(Set.of(customerRole)))
                .build();

        User savedUser = userRepository.save(newUser);
        List<String> roleNames = savedUser.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return AuthResponseDto.builder()
                .email(savedUser.getEmail())
                .roles(roleNames)
                .message("Account created successfully!")
                .success(true)
                .build();
    }
}
