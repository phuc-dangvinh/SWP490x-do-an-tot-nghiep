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
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.repositories.ProductRepositoryCustom;

@Component
@RequiredArgsConstructor
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {
  @PersistenceContext
  private final EntityManager entityManager;

  @Override
  public List<Product> getFilter(String keyword) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Product> query = criteriaBuilder.createQuery(Product.class);
    Root<Product> product = query.from(Product.class);
    Path<String> namePath = product.get("name");
    Path<String> descriptionPath = product.get("description");
    List<Predicate> predicates = new ArrayList<>();
    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(namePath), "%" + keyword.toLowerCase().trim() + "%"));
    predicates
        .add(criteriaBuilder.like(criteriaBuilder.lower(descriptionPath), "%" + keyword.toLowerCase().trim() + "%"));
    query.select(product).where(criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()])));
    return entityManager.createQuery(query).getResultList();
  }

  @Override
  public List<Product> getByCategory(String categoryId) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Product> query = criteriaBuilder.createQuery(Product.class);
    Root<Product> product = query.from(Product.class);
    Path<Category> categoryPath = product.get("category");
    List<Predicate> predicates = new ArrayList<>();
    if (!categoryId.isEmpty()) {
      predicates.add(criteriaBuilder.equal(categoryPath.get("id"), categoryId));
    }
    query.select(product).where(predicates.toArray(new Predicate[predicates.size()]));
    return entityManager.createQuery(query).getResultList();
  }

}
