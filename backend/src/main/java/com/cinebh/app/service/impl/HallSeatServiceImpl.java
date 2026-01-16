package com.cinebh.app.service.impl;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.mapper.HallSeatMapper;
import com.cinebh.app.repository.HallSeatRepository;
import com.cinebh.app.service.HallSeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class HallSeatServiceImpl implements HallSeatService {

    private final HallSeatRepository hallSeatRepository;
    private final HallSeatMapper hallSeatMapper;

    @Override
    public List<HallSeatDto> getSeatsByHall(UUID hallId) {
        return hallSeatRepository.findByCinemaHallId(hallId)
                .stream()
                .map(hallSeatMapper::toDto)
                .toList();
    }
}
