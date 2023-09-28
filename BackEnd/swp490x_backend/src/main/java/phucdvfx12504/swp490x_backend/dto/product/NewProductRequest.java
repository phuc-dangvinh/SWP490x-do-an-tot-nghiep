package phucdvfx12504.swp490x_backend.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewProductRequest {
  private String name;
  private double price;
  private String image;
  private String categoryId;
  private String description;
}
