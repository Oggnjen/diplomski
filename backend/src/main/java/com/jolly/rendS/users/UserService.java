package com.jolly.rendS.users;

import com.jolly.rendS.users.dtos.RegisterUserDto;
import com.jolly.rendS.users.dtos.UserDto;

import java.util.List;

public interface UserService {
    UserDto register(RegisterUserDto userDto);
    User findByEmail(String email);
    List<UserDto> getAll();
}
