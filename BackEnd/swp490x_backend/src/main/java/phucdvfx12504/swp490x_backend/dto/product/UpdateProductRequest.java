package phucdvfx12504.swp490x_backend.dto.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {
  private String id;
  private String name;
  private double price;
  private List<String> imageIds;
  private String categoryId;
  private String description;
}
