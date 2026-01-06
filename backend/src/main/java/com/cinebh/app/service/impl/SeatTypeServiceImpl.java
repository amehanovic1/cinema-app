package com.cinebh.app.service.impl;

import com.cinebh.app.dto.SeatTypeDto;
import com.cinebh.app.entity.SeatType;
import com.cinebh.app.mapper.SeatTypeMapper;
import com.cinebh.app.repository.SeatTypeRepository;
import com.cinebh.app.service.SeatTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SeatTypeServiceImpl implements SeatTypeService {

    private final SeatTypeRepository seatTypeRepository;
    private final SeatTypeMapper seatTypeMapper;

    @Override
    public List<SeatTypeDto> getAllSeatTypes() {
        return seatTypeRepository.findAll()
                .stream()
                .sorted(Comparator.comparingDouble(SeatType::getPrice))
                .map(seatTypeMapper::toDto)
                .toList();
    }
}
