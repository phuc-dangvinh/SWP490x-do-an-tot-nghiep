package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.UserUpdate;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.UserService;
import phucdvfx12504.swp490x_backend.utils.PropertyUtils;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRepositoryCustom userRepositoryCustom;
    private final PropertyUtils updateUtils;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getFilter(String fullname, String email) {
        return userRepositoryCustom.getFilter(fullname, email);
    }

    @Override
    @Transactional
    public void delete(List<String> ids) {
        userRepository.deleteAllById(ids);
    }

    @Override
    @Transactional
    public User update(UserUpdate userUpdate) {
        User user = userRepository.findById(userUpdate.getId()).orElseThrow();
        updateUtils.copyNonNullProperties(userUpdate, user);
        return userRepository.save(user);
    }
}
