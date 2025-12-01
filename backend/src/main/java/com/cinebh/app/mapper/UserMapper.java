package com.cinebh.app.mapper;

import com.cinebh.app.dto.UserDto;
import com.cinebh.app.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {RoleMapper.class})
public interface UserMapper {

    @Mapping(source = "city.id", target = "cityId")
    UserDto toDto(User user);
}
