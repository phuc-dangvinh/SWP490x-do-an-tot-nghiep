package phucdvfx12504.swp490x_backend.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import phucdvfx12504.swp490x_backend.entities.Product;

@Repository
public interface ProductRepositoryCustom {
  List<Product> getFilter(String keyword);

  List<Product> getByCategory(String categoryId);
}
