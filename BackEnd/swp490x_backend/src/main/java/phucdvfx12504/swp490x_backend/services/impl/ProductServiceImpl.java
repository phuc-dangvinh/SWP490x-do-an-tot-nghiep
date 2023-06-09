package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.product.ProductUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Product;
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

}
