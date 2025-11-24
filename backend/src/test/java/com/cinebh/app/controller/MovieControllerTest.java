package com.cinebh.app.controller;

import com.cinebh.app.dto.GenreDto;
import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.service.MovieService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(MovieController.class)
public class MovieControllerTest {

    @MockitoBean
    private MovieService movieService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenGenre_whenGetCurrentlyShowingMovies_thenReturnOnlyMoviesOfThatGenre() throws Exception {
        GenreDto actionGenre = new GenreDto();
        actionGenre.setName("Action");
        GenreDto adventureGenre = new GenreDto();
        adventureGenre.setName("Adventure");

        MovieDto movie = new MovieDto();
        movie.setTitle("Movie 1");
        movie.setGenres(List.of(actionGenre, adventureGenre));

        PageDto<MovieDto> pageDto = new PageDto<>();
        pageDto.setContent(List.of(movie));
        pageDto.setNumber(0);
        pageDto.setSize(5);
        pageDto.setTotalElements(1);
        pageDto.setTotalPages(1);
        pageDto.setHasNext(false);
        pageDto.setHasPrevious(false);

        when(movieService.getCurrentlyShowingMovies(
                any(), any(), any(), eq("Action"), any(), any(), any())
        ).thenReturn(pageDto);

        mockMvc.perform(get("/api/movies/currently-showing")
                        .param("genre", "Action")
                        .param("page", "0")
                        .param("size", "5")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].title").value("Movie 1"))
                .andExpect(jsonPath("$.content[0].genres[0].name").value("Action"))
                .andExpect(jsonPath("$.content[0].genres[1].name").value("Adventure"))
                .andExpect(jsonPath("$.number").value(0))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.hasNext").value(false))
                .andExpect(jsonPath("$.hasPrevious").value(false));
    }
}