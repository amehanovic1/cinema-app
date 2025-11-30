package com.cinebh.app.mapper;

import com.cinebh.app.dto.RoleDto;
import com.cinebh.app.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleDto toDto(Role role);
}
