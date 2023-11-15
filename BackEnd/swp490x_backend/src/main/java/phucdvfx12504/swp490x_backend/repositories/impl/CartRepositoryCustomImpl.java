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
import phucdvfx12504.swp490x_backend.dto.cart.FindCartByUserAndProductRequest;
import phucdvfx12504.swp490x_backend.entities.Cart;
import phucdvfx12504.swp490x_backend.repositories.CartRepositoryCustom;

@Component
@RequiredArgsConstructor
public class CartRepositoryCustomImpl implements CartRepositoryCustom {
  @PersistenceContext
  private final EntityManager entityManager;

  @Override
  public Cart findByUserAndProduct(FindCartByUserAndProductRequest request) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Cart> query = criteriaBuilder.createQuery(Cart.class);
    Root<Cart> cart = query.from(Cart.class);
    Path<Cart> userPath = cart.get("user");
    Path<Cart> productPath = cart.get("product");
    List<Predicate> predicates = new ArrayList<>();
    predicates.add(criteriaBuilder.and(criteriaBuilder.equal(userPath.get("id"), request.getUserId()),
        criteriaBuilder.equal(productPath.get("id"), request.getProductId())));
    query.select(cart).where(predicates.toArray(new Predicate[predicates.size()]));
    return entityManager.createQuery(query).getSingleResult();
  }
}
