package phucdvfx12504.swp490x_backend.dto.cart;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindCartByUserAndProductRequest {
  private String userId;
  private String productId;
}
