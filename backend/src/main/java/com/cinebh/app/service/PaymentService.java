package com.cinebh.app.service;

import java.util.Map;
import java.util.UUID;

public interface PaymentService {

    Map<String, String> createPaymentIntent(UUID bookingId);
}
