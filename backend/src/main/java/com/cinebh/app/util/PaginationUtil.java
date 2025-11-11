package com.cinebh.app.util;

import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Page;


public class PaginationUtil {

    private PaginationUtil() {}

    public static <T> PageDto<T> buildPaginatedResponse (Page<T> page) {
        PageDto<T> pageDto = new PageDto<>();
        pageDto.setContent(page.getContent());
        pageDto.setNumber(page.getNumber());
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalElements(page.getTotalElements());
        pageDto.setSize(page.getSize());
        pageDto.setHasNext(page.hasNext());
        pageDto.setHasPrevious(page.hasPrevious());
        return pageDto;
    }
}
