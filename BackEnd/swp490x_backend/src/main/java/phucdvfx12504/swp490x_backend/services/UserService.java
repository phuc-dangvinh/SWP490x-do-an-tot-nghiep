package phucdvfx12504.swp490x_backend.services;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.entities.User;

@Service
public interface UserService {
    User register(User user);
}
