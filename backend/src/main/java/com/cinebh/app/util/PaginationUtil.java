package com.cinebh.app.util;

import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Page;


public class PaginationUtil {

    private PaginationUtil() {}

    public static <T> PageDto<T> buildPaginatedResponse (Page<T> page) {
        return new PageDto<>(
            page.getContent(),
            page.getNumber(),
            page.getTotalPages(),
            page.getTotalElements(),
            page.getSize(),
            page.hasNext(),
            page.hasPrevious()
        );
    }
}
