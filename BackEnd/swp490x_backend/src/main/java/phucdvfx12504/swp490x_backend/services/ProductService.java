package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.product.NewProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.UpdateProductRequest;
import phucdvfx12504.swp490x_backend.entities.Product;

@Service
public interface ProductService {
  List<Product> getAll();

  List<Product> getFilter(String keyword);

  void delete(List<String> ids);

  Product update(UpdateProductRequest request);

  Product add(NewProductRequest request);

  List<Product> getByCategory(String categoryId);
}
