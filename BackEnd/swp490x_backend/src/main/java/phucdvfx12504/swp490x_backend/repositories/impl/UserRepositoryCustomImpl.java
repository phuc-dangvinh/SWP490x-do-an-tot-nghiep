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
    public List<User> getFilter(String keyword) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
        Root<User> user = query.from(User.class);
        Path<String> fullnamePath = user.get("fullname");
        Path<String> emailPath = user.get("email");
        Path<String> phonePath = user.get("phone");
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(
                criteriaBuilder.like(criteriaBuilder.lower(fullnamePath), "%" + keyword.toLowerCase().trim() + "%"));
        predicates
                .add(criteriaBuilder.like(criteriaBuilder.lower(emailPath), "%" + keyword.toLowerCase().trim() + "%"));
        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(phonePath), "%" + keyword.trim() + "%"));
        query.select(user).where(criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()])));
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<User> findByIdOrEmail(String idOrEmail) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
        Root<User> user = query.from(User.class);
        Path<String> idPath = user.get("id");
        Path<String> emailPath = user.get("email");
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(criteriaBuilder.equal(idPath, idOrEmail.toLowerCase().trim()));
        predicates.add(criteriaBuilder.equal(emailPath, idOrEmail.toLowerCase().trim()));
        query.select(user).where(criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()])));
        return entityManager.createQuery(query).getResultList();
    }
}
