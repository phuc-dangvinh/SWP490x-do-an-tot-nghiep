package phucdvfx12504.swp490x_backend.database;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.entities.Role;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;

@Configuration
@RequiredArgsConstructor
public class Database {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDatabase() {
        return new CommandLineRunner() {

            @Override
            public void run(String... args) throws Exception {
                if (!roleRepository.findByName(ERoleName.USER).isPresent()) {
                    roleRepository.save(new Role(ERoleName.USER));
                }
                if (!roleRepository.findByName(ERoleName.ADMIN).isPresent()) {
                    roleRepository.save(new Role(ERoleName.ADMIN));
                }
                if (!userRepository.findByEmail("admin").isPresent()) {
                    User user = User.builder().fullname("admin").email("admin")
                            .password(passwordEncoder.encode("admin"))
                            .roles(Set.of(roleRepository.findByName(ERoleName.ADMIN).get())).build();
                    userRepository.save(user);
                }
            }
        };
    }
}
