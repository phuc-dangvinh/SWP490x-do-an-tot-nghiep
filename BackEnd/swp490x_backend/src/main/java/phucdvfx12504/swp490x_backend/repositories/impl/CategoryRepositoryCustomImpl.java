package phucdvfx12504.swp490x_backend.repositories.impl;

import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepositoryCustom;

@Component
@RequiredArgsConstructor
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {
  @PersistenceContext
  private final EntityManager entityManager;

  @Override
  public boolean existName(String name) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Category> query = criteriaBuilder.createQuery(Category.class);
    Root<Category> category = query.from(Category.class);
    Path<String> namePath = category.get("name");
    query.select(category).where(criteriaBuilder.equal(criteriaBuilder.lower(namePath), name.toLowerCase().trim()));
    return entityManager.createQuery(query).getResultList().size() > 0;
  }

}
