package phucdvfx12504.swp490x_backend.database;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.entities.Role;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;

@Configuration
public class Database {

    @Bean
    public CommandLineRunner initDatabase(RoleRepository roleRepository) {
        return new CommandLineRunner() {

            @Override
            public void run(String... args) throws Exception {
                Role user = new Role(ERoleName.USER);
                Role admin = new Role(ERoleName.ADMIN);
                roleRepository.save(user);
                roleRepository.save(admin);
            }
        };
    }

}
