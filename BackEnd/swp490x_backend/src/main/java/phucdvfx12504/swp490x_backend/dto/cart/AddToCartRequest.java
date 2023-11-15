package phucdvfx12504.swp490x_backend.dto.cart;

import lombok.Getter;

@Getter
public class AddToCartRequest {
  private String userId;
  private String productId;
  private int quantity;
}
