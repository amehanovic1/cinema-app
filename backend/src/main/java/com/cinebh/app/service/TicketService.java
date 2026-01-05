package com.cinebh.app.service;

import java.util.List;
import java.util.UUID;

public interface TicketService {

    List<String> getReservedSeatsForProjection(UUID projectionId);
}
