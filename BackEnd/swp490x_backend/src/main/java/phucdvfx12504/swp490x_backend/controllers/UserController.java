package phucdvfx12504.swp490x_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User newUser) {
        return userService.register(newUser);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return null;
    }
}
