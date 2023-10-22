package phucdvfx12504.swp490x_backend.dto.cart;

import lombok.Getter;
import phucdvfx12504.swp490x_backend.constant.QuantityAction;

@Getter
public class ChangeQuantityRequest {
  private String userId;
  private String productId;
  private QuantityAction action;
}
