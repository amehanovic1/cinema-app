package com.cinebh.app.controller;

import com.cinebh.app.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-intent/{bookingId}")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(paymentService.createPaymentIntent(bookingId));
    }
}
