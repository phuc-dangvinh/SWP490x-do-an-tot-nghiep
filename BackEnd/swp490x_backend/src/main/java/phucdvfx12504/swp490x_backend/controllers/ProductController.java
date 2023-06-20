package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.product.ProductUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.services.ProductService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public List<Product> getAll() {
    return productService.getAll();
  }

  @GetMapping("/search")
  public List<Product> getFilter(@RequestParam(required = false) String keyword) {
    return productService.getFilter(keyword);
  }

  @DeleteMapping("/manage")
  public void delete(@RequestBody List<String> ids) {
    productService.delete(ids);
  }

  @PutMapping("/manage")
  public Product update(@RequestBody ProductUpdateRequest productUpdate) {
    return productService.update(productUpdate);
  }

}
