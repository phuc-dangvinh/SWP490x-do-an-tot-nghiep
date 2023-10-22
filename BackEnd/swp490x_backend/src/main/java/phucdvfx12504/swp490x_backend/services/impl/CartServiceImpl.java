package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.QuantityAction;
import phucdvfx12504.swp490x_backend.dto.cart.AddToCartRequest;
import phucdvfx12504.swp490x_backend.dto.cart.ChangeQuantityRequest;
import phucdvfx12504.swp490x_backend.dto.cart.FindCartByUserAndProductRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Cart;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.CartRepository;
import phucdvfx12504.swp490x_backend.repositories.CartRepositoryCustom;
import phucdvfx12504.swp490x_backend.repositories.ProductRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.services.CartService;

@Component
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final CartRepository cartRepository;
  private final CartRepositoryCustom cartRepositoryCustom;

  @Override
  @Transactional
  public Cart addToCart(AddToCartRequest request) {
    User user = userRepository.findById(request.getUserId()).orElseThrow();
    Cart existCart = user
        .getCarts()
        .stream()
        .filter(item -> item.getProduct().getId().equals(request.getProductId()))
        .findFirst()
        .orElse(null);
    if (existCart == null) {
      Product product = productRepository.findById(request.getProductId()).orElseThrow();
      Cart cart = Cart.builder()
          .user(user)
          .product(product)
          .quantity(request.getQuantity())
          .build();
      return cartRepository.save(cart);
    } else {
      existCart.setQuantity(existCart.getQuantity() + request.getQuantity());
      return cartRepository.save(existCart);
    }
  }

  @Override
  public List<Cart> getCart(String userId) {
    User user = userRepository.findById(userId).orElseThrow();
    return user.getCarts();
  }

  @Override
  @Transactional
  public int changeQuantityCart(ChangeQuantityRequest request) {
    FindCartByUserAndProductRequest requestRepository = FindCartByUserAndProductRequest.builder()
        .productId(request.getProductId())
        .userId(request.getUserId())
        .build();
    Cart cart = cartRepositoryCustom.findByUserAndProduct(requestRepository);
    int quantity = Math.max(1, cart.getQuantity() + (request.getAction() == QuantityAction.INCREASE ? +1 : -1));
    cart.setQuantity(quantity);
    cartRepository.save(cart);
    return quantity;
  }

  @Override
  public TextMessageResponse deleteCart(List<String> ids) {
    for (String id : ids) {
      Cart cart = cartRepository.findById(id).orElseThrow();
      cartRepository.delete(cart);
    }
    return TextMessageResponse.builder().info("DELETED").build();
  }
}
