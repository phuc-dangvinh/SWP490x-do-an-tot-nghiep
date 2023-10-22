package phucdvfx12504.swp490x_backend.dto.product;

import lombok.Getter;

@Getter
public class SearchProductRequest {
  private String categoryId;
  private String keyword;
  private double priceFrom;
  private double priceTo;
}
