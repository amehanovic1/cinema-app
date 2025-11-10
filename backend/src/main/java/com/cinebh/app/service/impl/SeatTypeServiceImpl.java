package com.cinebh.app.service.impl;

import com.cinebh.app.dto.PaginatedResponse;
import com.cinebh.app.dto.SeatTypeResponse;
import com.cinebh.app.entity.SeatType;
import com.cinebh.app.mapper.SeatTypeMapper;
import com.cinebh.app.repository.SeatTypeRepository;
import com.cinebh.app.service.SeatTypeService;
import com.cinebh.app.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeatTypeServiceImpl implements SeatTypeService {

    private final SeatTypeRepository seatTypeRepository;
    private final SeatTypeMapper seatTypeMapper;

    @Override
    public PaginatedResponse<SeatTypeResponse> getAllSeatTypes(Pageable pageable) {
        Page<SeatType> seatTypes = seatTypeRepository.findAll(pageable);
        return PaginationUtil.buildPaginatedResponse(seatTypes.map(seatTypeMapper::toResponse));
    }
}
