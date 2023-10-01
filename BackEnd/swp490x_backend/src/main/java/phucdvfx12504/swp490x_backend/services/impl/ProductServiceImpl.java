package phucdvfx12504.swp490x_backend.services.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.product.NewProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.ProductUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepository;
import phucdvfx12504.swp490x_backend.repositories.ImageProductRepository;
import phucdvfx12504.swp490x_backend.repositories.ProductRepository;
import phucdvfx12504.swp490x_backend.repositories.ProductRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.ProductService;
import phucdvfx12504.swp490x_backend.utils.UpdatePropertyUtils;

@Component
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository productRepository;
  private final ProductRepositoryCustom productRepositoryCustom;
  private final UpdatePropertyUtils propertyUtils;
  private final CategoryRepository categoryRepository;
  private final ImageProductRepository imageProductRepository;

  @Override
  public List<Product> getAll() {
    return productRepository.findAll();
  }

  @Override
  public List<Product> getFilter(String keyword) {
    return productRepositoryCustom.getFilter(keyword);
  }

  @Override
  @Transactional
  public void delete(List<String> ids) {
    for (String id : ids) {
      productRepository.deleteById(id);
    }
  }

  @Override
  @Transactional
  public Product update(ProductUpdateRequest productUpdate) {
    Product product = productRepository.findById(productUpdate.getId()).orElseThrow();
    propertyUtils.copyNonNullProperties(productUpdate, product);
    return productRepository.save(product);
  }

  @Override
  @Transactional
  public Product add(NewProductRequest request) {
    Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
    Product product = productRepository.save(
        Product.builder()
            .name(request.getName())
            .price(request.getPrice())
            .category(category)
            .description(request.getDescription())
            .build());
    for (String imageId : request.getImageIds()) {
      ImageProduct imageProduct = imageProductRepository.findById(imageId).orElseThrow();
      imageProduct.setProduct(product);
    }
    return productRepository.findById(product.getId()).orElseThrow();
  }

  @Override
  public List<Product> getByCategory(String categoryId) {
    return productRepositoryCustom.getByCategory(categoryId);
  }

}
