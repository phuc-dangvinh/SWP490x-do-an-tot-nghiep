package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.UserService;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    // @Autowired
    private final UserRepository userRepository;
    private final UserRepositoryCustom userRepositoryCustom;

    // @Override
    // public User register(User user) {
    // if (!userRepository.existsByEmail(user.getUsername())) {
    // user.setPassword(passwordEncoder.encode(user.getPassword()));
    // Optional<Role> userRole = roleRepository.findByName(ERoleName.USER);
    // user.setRoles(Set.of(userRole.isPresent() ? userRole.get() : null));
    // return userRepository.save(user);
    // } else {
    // return null;
    // }
    // }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getFilter(String fullname, String email) {
        return userRepositoryCustom.getFilter(fullname, email);
    }
}
