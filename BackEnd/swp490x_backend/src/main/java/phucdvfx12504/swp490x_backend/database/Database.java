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
                if (!roleRepository.findByName(ERoleName.USER).isPresent()) {
                    roleRepository.save(new Role(ERoleName.USER));
                }
                if (!roleRepository.findByName(ERoleName.ADMIN).isPresent()) {
                    roleRepository.save(new Role(ERoleName.ADMIN));
                }
            }
        };
    }
}
