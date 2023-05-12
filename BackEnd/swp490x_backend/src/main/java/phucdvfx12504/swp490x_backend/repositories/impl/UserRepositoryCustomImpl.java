package phucdvfx12504.swp490x_backend.repositories.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;

@Component
@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public List<User> getFilter(String fullname, String email) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
        Root<User> user = query.from(User.class);
        Path<String> fullnamePath = user.get("fullname");
        Path<String> emailPath = user.get("email");
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(fullnamePath), "%" + fullname.toLowerCase() + "%"));
        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(emailPath), "%" + email.toLowerCase() + "%"));
        query.select(user).where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
        return entityManager.createQuery(query).getResultList();
    }
}
