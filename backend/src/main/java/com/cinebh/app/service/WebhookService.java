package com.cinebh.app.service;

public interface WebhookService {

    void processEvent(String payload, String sigHeader);
}
