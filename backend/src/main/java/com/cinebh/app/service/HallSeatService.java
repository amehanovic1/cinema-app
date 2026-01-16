package com.cinebh.app.service;

import com.cinebh.app.dto.HallSeatDto;

import java.util.List;
import java.util.UUID;

public interface HallSeatService {

    List<HallSeatDto> getSeatsByHall(UUID hallId);
}
