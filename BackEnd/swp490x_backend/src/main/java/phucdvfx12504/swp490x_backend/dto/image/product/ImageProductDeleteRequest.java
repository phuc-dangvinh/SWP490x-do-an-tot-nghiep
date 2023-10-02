package phucdvfx12504.swp490x_backend.dto.image.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageProductDeleteRequest {
  private String id;
  private String fileName;
}
