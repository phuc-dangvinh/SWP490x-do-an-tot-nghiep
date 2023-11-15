package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.cart.AddToCartRequest;
import phucdvfx12504.swp490x_backend.dto.cart.ChangeQuantityRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Cart;

@Service
public interface CartService {
  Cart addToCart(AddToCartRequest request);

  List<Cart> getCart(String userId);

  int changeQuantityCart(ChangeQuantityRequest request);

  TextMessageResponse deleteCart(List<String> ids);
}
