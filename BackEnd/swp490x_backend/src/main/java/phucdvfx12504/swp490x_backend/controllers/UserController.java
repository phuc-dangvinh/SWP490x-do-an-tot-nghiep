package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    // @Autowired
    private final UserService userService;

    // @PostMapping("/register")
    // public User register(@RequestBody User newUser) {
    // return userService.register(newUser);
    // }

    // @PostMapping("/login")
    // public String login(@RequestBody User user) {
    // return null;
    // }

    @GetMapping("/manage")
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/manage/search")
    public List<User> getFilter(
            @RequestParam(required = false) String fullname,
            @RequestParam(required = false) String email) {
        return userService.getFilter(fullname, email);
    }

}
