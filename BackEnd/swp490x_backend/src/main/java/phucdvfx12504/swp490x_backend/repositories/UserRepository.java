package phucdvfx12504.swp490x_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import phucdvfx12504.swp490x_backend.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    // @Query(value = "SELECT user FROM User user WHERE user.fullname LIKE '%:fullname%'' AND user.email LIKE '%email'")
    // List<User> getFilter(@Param("fullname") String fullname, @Param("email") String email);
}
