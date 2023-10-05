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
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.repositories.ImageProductRepositoryCustom;

@Component
@RequiredArgsConstructor
public class ImageProductRepositoryCustomImpl implements ImageProductRepositoryCustom {
  @PersistenceContext
  private final EntityManager entityManager;

  @Override
  public List<ImageProduct> findImagesNotSetProduct() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<ImageProduct> query = criteriaBuilder.createQuery(ImageProduct.class);
    Root<ImageProduct> image = query.from(ImageProduct.class);
    Path<Product> productPath = image.get("product");
    List<Predicate> predicates = new ArrayList<>();
    predicates.add(criteriaBuilder.isNull(productPath));
    query.select(image).where(predicates.toArray(new Predicate[predicates.size()]));
    return entityManager.createQuery(query).getResultList();
  }

}
