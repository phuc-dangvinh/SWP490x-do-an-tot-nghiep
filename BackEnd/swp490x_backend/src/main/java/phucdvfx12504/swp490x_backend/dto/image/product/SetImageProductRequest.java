package phucdvfx12504.swp490x_backend.dto.image.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetImageProductRequest {
  private String idImage;
  private String idProduct;
}
