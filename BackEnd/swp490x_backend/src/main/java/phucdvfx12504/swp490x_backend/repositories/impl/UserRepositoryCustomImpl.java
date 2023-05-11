package phucdvfx12504.swp490x_backend.repositories.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;

@Component
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getFilter(String fullname, String email) {

        return null;
    }

}
