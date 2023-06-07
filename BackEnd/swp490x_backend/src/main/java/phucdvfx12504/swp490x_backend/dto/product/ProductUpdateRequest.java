package phucdvfx12504.swp490x_backend.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.Category;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateRequest {
  private String id;
  private String name;
  private double price;
  private String description;
  private Category category;
}
