package phucdvfx12504.swp490x_backend.services;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.dto.user.CheckExistUserRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserChangePasswordRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.User;

@Service
public interface UserService {

    List<User> getAll();

    List<User> getFilter(String keyword);

    TextMessageResponse delete(List<String> ids);

    User update(UserUpdateRequest userUpdate);

    User changePassword(UserChangePasswordRequest userChangePasswordRequest);

    TextMessageResponse resetPassword(List<String> id) throws UnsupportedEncodingException, MessagingException;

    boolean checkExist(CheckExistUserRequest email);

}
