package com.cinebh.app.service;

import com.cinebh.app.dto.PaginatedResponse;
import com.cinebh.app.dto.SeatTypeResponse;
import org.springframework.data.domain.Pageable;


public interface SeatTypeService {

    PaginatedResponse<SeatTypeResponse> getAllSeatTypes(Pageable pageable);
}
