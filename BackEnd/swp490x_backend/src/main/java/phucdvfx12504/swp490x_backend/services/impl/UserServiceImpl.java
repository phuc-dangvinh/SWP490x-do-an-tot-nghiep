package phucdvfx12504.swp490x_backend.services.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.UserUpdate;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.UserService;
import phucdvfx12504.swp490x_backend.utils.UpdateUtils;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRepositoryCustom userRepositoryCustom;
    private final ModelMapper modelMapper;
    private final UpdateUtils updateUtils;

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
    public User update(UserUpdate userUpdate)
            throws IllegalArgumentException, IllegalAccessException, InvocationTargetException {
        User user = userRepository.findById(userUpdate.getId()).orElseThrow();
        // try {
        // user = (User) updateUtils.update(user, userUpdate);
        // } catch (Exception e) {
        // e.getMessage();
        // }
        user = (User) updateUtils.update(user, userUpdate);
        return userRepository.save(user);
    }
}
