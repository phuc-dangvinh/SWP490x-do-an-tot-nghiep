package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.entities.User;

@Service
public interface UserService {
    // User register(User user);

    List<User> getAll();

    List<User> getFilter(String fullname, String email);

}
