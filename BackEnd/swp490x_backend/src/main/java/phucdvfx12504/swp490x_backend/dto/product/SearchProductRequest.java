package phucdvfx12504.swp490x_backend.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchProductRequest {
  private String categoryId;
  private String keyword;
  private double priceFrom;
  private double priceTo;
}
