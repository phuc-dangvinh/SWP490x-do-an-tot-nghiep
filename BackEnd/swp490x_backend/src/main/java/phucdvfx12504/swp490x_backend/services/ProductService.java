package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.product.NewProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.SearchProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.UpdateProductRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Product;

@Service
public interface ProductService {
  List<Product> getAll();

  List<Product> search(SearchProductRequest request);

  TextMessageResponse delete(List<String> ids);

  Product update(UpdateProductRequest request);

  Product add(NewProductRequest request);

  List<Product> getByCategory(String categoryId);
}
