package com.cinebh.app.service.impl;

import com.cinebh.app.dto.GenreDto;
import com.cinebh.app.mapper.GenreMapper;
import com.cinebh.app.repository.GenreRepository;
import com.cinebh.app.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    public List<GenreDto> getAllGenres() {
        return genreRepository.findAll()
                .stream()
                .map(genreMapper::toDto)
                .toList();
    }
}
