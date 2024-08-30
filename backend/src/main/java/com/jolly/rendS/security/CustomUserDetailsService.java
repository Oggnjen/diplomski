package com.jolly.rendS.security;

import com.jolly.rendS.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = repository.findUserByEmail(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Cannot find user with given email");
        }
        return CustomUserDetails.builder()
                .email(user.get().getEmail())
                .id(user.get().getId())
                .name(user.get().getName())
                .password(user.get().getPassword())
                .surname(user.get().getSurname())
                .build();
    }
}
