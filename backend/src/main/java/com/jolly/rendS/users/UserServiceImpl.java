package com.jolly.rendS.users;

import com.jolly.rendS.security.CustomUserDetails;
import com.jolly.rendS.users.dtos.RegisterUserDto;
import com.jolly.rendS.users.dtos.UserDto;
import com.jolly.rendS.utils.CustomBadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto register(RegisterUserDto userDto) {
        var user = userRepository.findUserByEmail(userDto.email());
        if (user.isPresent()) {
            throw new CustomBadRequestException("User with that email already exist");
        }
        return map(userRepository.save(User.builder()
                .email(userDto.email())
                .password(passwordEncoder.encode(userDto.password()))
                .name(userDto.name())
                .surname(userDto.surname())
                .build()));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow();
    }

    @Override
    public List<UserDto> getAll() {
        return userRepository.findAllByIdIsNot(getLoggedId()).stream().map(this::map).collect(Collectors.toList());
    }

    private UserDto map(User user) {
        return new UserDto(user.getEmail(), user.getName(), user.getSurname(), user.getId());
    }

    private long getLoggedId(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var detailUser = (CustomUserDetails)auth.getPrincipal();
        var user = findByEmail(detailUser.getEmail());
        return user.getId();
    }
}
