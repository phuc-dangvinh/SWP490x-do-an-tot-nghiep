package phucdvfx12504.swp490x_backend.controllers;

import java.io.UnsupportedEncodingException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.auth.AuthenticationService;
import phucdvfx12504.swp490x_backend.dto.user.AuthenticationResponse;
import phucdvfx12504.swp490x_backend.dto.user.UserLoginRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserRegisterRequest;
import phucdvfx12504.swp490x_backend.entities.User;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public User register(@RequestBody UserRegisterRequest request)
            throws MessagingException, UnsupportedEncodingException {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody UserLoginRequest request) {
        return authenticationService.login(request);
    }
}
