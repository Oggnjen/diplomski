package com.jolly.rendS.utils;

import com.jolly.rendS.security.CustomUserDetails;
import com.jolly.rendS.users.User;
import com.jolly.rendS.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserUtils {

    private final UserRepository userRepository;

    public User getLoggedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userRepository.findUserByEmail(userDetails.getEmail()).orElseThrow();
    }
}
