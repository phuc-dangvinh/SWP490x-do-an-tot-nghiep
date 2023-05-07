package phucdvfx12504.swp490x_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.entities.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(ERoleName name);
}
