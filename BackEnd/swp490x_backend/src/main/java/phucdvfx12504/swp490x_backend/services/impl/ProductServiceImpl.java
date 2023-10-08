package phucdvfx12504.swp490x_backend.services.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.product.NewProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.SearchProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.UpdateProductRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepository;
import phucdvfx12504.swp490x_backend.repositories.ImageProductRepository;
import phucdvfx12504.swp490x_backend.repositories.ProductRepository;
import phucdvfx12504.swp490x_backend.repositories.ProductRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.ImageProductService;
import phucdvfx12504.swp490x_backend.services.ProductService;

@Component
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository productRepository;
  private final ProductRepositoryCustom productRepositoryCustom;
  private final CategoryRepository categoryRepository;
  private final ImageProductRepository imageProductRepository;
  private final ImageProductService imageProductService;

  @Override
  public List<Product> getAll() {
    return productRepository.findAll();
  }

  @Override
  public List<Product> search(SearchProductRequest request) {
    return productRepositoryCustom.search(request);
  }

  @Override
  @Transactional
  public TextMessageResponse delete(List<String> ids) {
    productRepository.deleteAllById(ids);
    return TextMessageResponse.builder().info("Deleted").build();
  }

  @Override
  @Transactional
  public Product update(UpdateProductRequest request) {
    Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
    Product product = productRepository.findById(request.getId()).orElseThrow();
    product.setName(request.getName());
    product.setPrice(request.getPrice());
    product.setCategory(category);
    product.setDescription(request.getDescription());
    for (ImageProduct image : product.getImageProducts()) {
      image.setProduct(null);
    }
    List<ImageProduct> images = new LinkedList<>();
    for (String imageId : request.getImageIds()) {
      ImageProduct image = imageProductRepository.findById(imageId).orElseThrow();
      image.setProduct(product);
      images.add(image);
    }
    product.setImageProducts(images);
    product = productRepository.save(product);
    imageProductService.deleteImagesNotSetProduct();
    return product;
  }

  @Override
  @Transactional
  public Product add(NewProductRequest request) {
    Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
    Product product = Product.builder()
        .name(request.getName())
        .price(request.getPrice())
        .category(category)
        .description(request.getDescription())
        .build();
    List<ImageProduct> images = new LinkedList<>();
    for (String imageId : request.getImageIds()) {
      ImageProduct image = imageProductRepository.findById(imageId).orElseThrow();
      image.setProduct(product);
      images.add(image);
    }
    product.setImageProducts(images);
    product = productRepository.save(product);
    imageProductService.deleteImagesNotSetProduct();
    return product;
  }

  @Override
  public List<Product> getByCategory(String categoryId) {
    return productRepositoryCustom.getByCategory(categoryId);
  }

}
