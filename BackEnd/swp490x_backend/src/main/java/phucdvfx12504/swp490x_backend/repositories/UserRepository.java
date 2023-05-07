package phucdvfx12504.swp490x_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import phucdvfx12504.swp490x_backend.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
}
