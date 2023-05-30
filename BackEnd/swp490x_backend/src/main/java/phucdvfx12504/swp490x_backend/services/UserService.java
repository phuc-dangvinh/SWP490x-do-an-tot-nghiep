package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.UserChangePasswordRequest;
import phucdvfx12504.swp490x_backend.dto.UserUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.User;

@Service
public interface UserService {

    List<User> getAll();

    List<User> getFilter(String keyword);

    void delete(List<String> ids);

    User update(UserUpdateRequest userUpdate);

    User changePassword(UserChangePasswordRequest userChangePasswordRequest);

}
