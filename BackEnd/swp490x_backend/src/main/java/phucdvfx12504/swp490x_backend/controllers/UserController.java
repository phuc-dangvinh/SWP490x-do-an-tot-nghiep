package phucdvfx12504.swp490x_backend.controllers;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.dto.user.CheckExistUserRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserChangePasswordRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserUpdateRequest;
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
    public List<User> getFilter(@RequestParam(required = false) String keyword) {
        return userService.getFilter(keyword);
    }

    @PostMapping("/manage")
    public TextMessageResponse delete(@RequestBody List<String> ids) {
        return userService.delete(ids);
    }

    @PutMapping("/manage")
    @CrossOrigin
    public TextMessageResponse update(@RequestBody UserUpdateRequest userUpdate) {
        return userService.update(userUpdate);
    }

    @PutMapping("/change-password")
    public User changePassword(@RequestBody UserChangePasswordRequest userChangePasswordRequest) {
        return userService.changePassword(userChangePasswordRequest);
    }

    @PostMapping("/manage/reset-password")
    public TextMessageResponse resetPassword(@RequestBody List<String> ids)
            throws UnsupportedEncodingException, MessagingException {
        return userService.resetPassword(ids);
    }

    @PostMapping("/manage/check-exist")
    public boolean checkExist(@RequestBody CheckExistUserRequest user) {
        return userService.checkExist(user);
    }
}
