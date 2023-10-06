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
import phucdvfx12504.swp490x_backend.dto.product.SearchProductRequest;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.repositories.ProductRepositoryCustom;

@Component
@RequiredArgsConstructor
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {
  @PersistenceContext
  private final EntityManager entityManager;

  @Override
  public List<Product> search(SearchProductRequest request) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Product> query = criteriaBuilder.createQuery(Product.class);
    Root<Product> product = query.from(Product.class);
    Path<Category> categoryPath = product.get("category");
    Path<String> namePath = product.get("name");
    Path<String> descriptionPath = product.get("description");
    Path<Double> pricePath = product.get("price");
    List<Predicate> predicatesFinal = new ArrayList<>();
    List<Predicate> predicates1 = new ArrayList<>();
    if (!request.getCategoryId().isEmpty()) {
      predicates1.add(criteriaBuilder.equal(categoryPath.get("id"), request.getCategoryId()));
    }
    if (request.getPriceFrom() > 0) {
      predicates1.add(criteriaBuilder.greaterThanOrEqualTo(pricePath, request.getPriceFrom()));
    }
    if (request.getPriceTo() > 0) {
      predicates1.add(criteriaBuilder.lessThanOrEqualTo(pricePath, request.getPriceTo()));
    }
    Predicate predicateAnd = criteriaBuilder.and(predicates1.toArray(new Predicate[predicates1.size()]));
    predicatesFinal.add(predicateAnd);
    if (!request.getKeyword().isBlank()) {
      List<Predicate> predicates2 = new ArrayList<>();
      predicates2.add(
          criteriaBuilder.like(criteriaBuilder.lower(namePath), "%" + request.getKeyword().toLowerCase().trim() + "%"));
      predicates2
          .add(criteriaBuilder.like(criteriaBuilder.lower(descriptionPath),
              "%" + request.getKeyword().toLowerCase().trim() + "%"));
      Predicate predicateOr = criteriaBuilder.or(predicates2.toArray(new Predicate[predicates2.size()]));
      predicatesFinal.add(predicateOr);
    }
    Predicate predicateFinal = criteriaBuilder.and(predicatesFinal.toArray(new Predicate[predicatesFinal.size()]));
    query.select(product).where(predicateFinal);
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
