package com.cinebh.app.service.impl;

import com.cinebh.app.service.BookingService;
import com.cinebh.app.service.WebhookService;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class WebhookServiceImpl implements WebhookService {

    private final BookingService bookingService;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    public void processEvent(String payload, String sigHeader) throws Exception {
        Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

        if ("payment_intent.succeeded".equals(event.getType())) {
            PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);

            if (paymentIntent == null)
                paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().deserializeUnsafe();

            if (paymentIntent != null) {
                String bookingId = paymentIntent.getMetadata().get("bookingId");
                if (bookingId != null) {
                    bookingService.confirmPayment(UUID.fromString(bookingId));
                }
            }
        }
    }
}
