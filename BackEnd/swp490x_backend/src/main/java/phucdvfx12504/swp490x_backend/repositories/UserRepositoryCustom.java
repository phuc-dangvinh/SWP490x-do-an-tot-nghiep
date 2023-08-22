package phucdvfx12504.swp490x_backend.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import phucdvfx12504.swp490x_backend.entities.User;

@Repository
public interface UserRepositoryCustom {
    List<User> getFilter(String keyword);

    List<User> findByIdOrEmail(String idOrEmail);
}
