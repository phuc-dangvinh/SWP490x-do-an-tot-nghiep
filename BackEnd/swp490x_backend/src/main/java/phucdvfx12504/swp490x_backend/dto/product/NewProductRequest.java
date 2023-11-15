package phucdvfx12504.swp490x_backend.dto.product;

import java.util.List;

import lombok.Getter;

@Getter
public class NewProductRequest {
  private String name;
  private double price;
  private List<String> imageIds;
  private String categoryId;
  private String description;
}
