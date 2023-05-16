package phucdvfx12504.swp490x_backend.controllers;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.UserUpdate;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

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

    @DeleteMapping("/manage")
    public void delete(@RequestBody List<String> ids) {
        userService.delete(ids);
    }

    @PutMapping("/manage")
    public User update(@RequestBody UserUpdate userUpdate) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException {
        return userService.update(userUpdate);
    }

}
