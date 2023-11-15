package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.cart.AddToCartRequest;
import phucdvfx12504.swp490x_backend.dto.cart.ChangeQuantityRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Cart;
import phucdvfx12504.swp490x_backend.services.CartService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
  private final CartService cartService;

  @PostMapping("/add-to-cart")
  public Cart addToCart(@RequestBody AddToCartRequest request) {
    return cartService.addToCart(request);
  }

  @GetMapping("/{userId}")
  public List<Cart> getCart(@PathVariable String userId) {
    return cartService.getCart(userId);
  }

  @PostMapping("/change-quantity")
  public int changeQuantityCart(@RequestBody ChangeQuantityRequest request) {
    return cartService.changeQuantityCart(request);
  }

  @PostMapping("/delete")
  public TextMessageResponse delete(@RequestBody List<String> ids) {
    return cartService.deleteCart(ids);
  }
}
