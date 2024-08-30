package com.jolly.rendS.users;

import com.jolly.rendS.users.dtos.RegisterUserDto;
import com.jolly.rendS.users.dtos.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/registration")
public class RegistrationController {

    private final UserService userService;


    @PostMapping
    public UserDto register(@RequestBody RegisterUserDto userDto) {
        return userService.register(userDto);
    }


}
