package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.dto.UserChangePasswordRequest;
import phucdvfx12504.swp490x_backend.dto.UserUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Role;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.UserService;
import phucdvfx12504.swp490x_backend.utils.PropertyUtils;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRepositoryCustom userRepositoryCustom;
    private final RoleRepository roleRepository;
    private final PropertyUtils updateUtils;
    private final PasswordEncoder passwordEncoder;

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
        Role adminRole = roleRepository.findByName(ERoleName.ADMIN).get();
        for (String id : ids) {
            User user = userRepository.findById(id).get();
            if (!user.getRoles().contains(adminRole)) {
                userRepository.deleteById(id);
            }
        }
    }

    @Override
    @Transactional
    public User update(UserUpdateRequest userUpdate) {
        User user = userRepository.findById(userUpdate.getId()).orElseThrow();
        updateUtils.copyNonNullProperties(userUpdate, user);
        return userRepository.save(user);
    }

    @Override
    public User changePassword(UserChangePasswordRequest userChangePasswordRequest) {
        User user = userRepository.findByEmail(userChangePasswordRequest.getEmail()).orElseThrow();
        String oldRawPassword = userChangePasswordRequest.getOldPassword();
        String newRawPassword = userChangePasswordRequest.getNewPassword();
        if (!newRawPassword.isEmpty() && passwordEncoder.matches(oldRawPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newRawPassword));
            return userRepository.save(user);
        }
        return null;
    }
}
