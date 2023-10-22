package phucdvfx12504.swp490x_backend.repositories;

import org.springframework.stereotype.Repository;

import phucdvfx12504.swp490x_backend.dto.cart.FindCartByUserAndProductRequest;
import phucdvfx12504.swp490x_backend.entities.Cart;

@Repository
public interface CartRepositoryCustom {
  Cart findByUserAndProduct(FindCartByUserAndProductRequest request);
}
