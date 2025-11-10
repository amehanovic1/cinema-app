package com.cinebh.app.util;

import com.cinebh.app.dto.PaginatedResponse;
import org.springframework.data.domain.Page;


public class PaginationUtil {

    private PaginationUtil() {}

    public static <T> PaginatedResponse<T> buildPaginatedResponse (Page<T> page) {
        PaginatedResponse<T> paginatedResponse = new PaginatedResponse<>();
        paginatedResponse.setData(page.getContent());
        paginatedResponse.setCurrentPage(page.getNumber());
        paginatedResponse.setTotalPages(page.getTotalPages());
        paginatedResponse.setTotalItems(page.getTotalElements());
        paginatedResponse.setPageSize(page.getSize());
        paginatedResponse.setHasNext(page.hasNext());
        paginatedResponse.setHasPrevious(page.hasPrevious());
        return paginatedResponse;
    }
}
