package phucdvfx12504.swp490x_backend.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import phucdvfx12504.swp490x_backend.entities.User;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return null;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return null;
    }
}
