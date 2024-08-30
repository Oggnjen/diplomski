package com.jolly.rendS.security;


import com.jolly.rendS.users.User;
import com.jolly.rendS.users.UserService;
import com.jolly.rendS.utils.CustomBadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class  AuthController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password())
            );
        } catch (Exception e) {
            System.out.println(e);
            throw new CustomBadRequestException("Invalid email or password");
        }
        User user = userService.findByEmail(authRequest.email());
        return jwtUtil.generateToken(authRequest.email(), user.getId());
    }
}
