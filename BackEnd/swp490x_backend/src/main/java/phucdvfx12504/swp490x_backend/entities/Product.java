package phucdvfx12504.swp490x_backend.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private double price;
  @Column(nullable = false)
  private String description;
  @Column(nullable = false)
  private String image;
  @ManyToOne()
  @JoinColumn(name = "category_id")
  private Category category;
  @ManyToMany(mappedBy = "products")
  private List<Cart> carts;
}
