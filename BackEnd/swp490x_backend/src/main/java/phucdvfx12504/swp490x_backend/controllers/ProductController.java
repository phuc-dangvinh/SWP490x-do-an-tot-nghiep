package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.product.NewProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.SearchProductRequest;
import phucdvfx12504.swp490x_backend.dto.product.UpdateProductRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Product;
import phucdvfx12504.swp490x_backend.services.ProductService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
  private final ProductService productService;

  @GetMapping("/get-all")
  public List<Product> getAll() {
    return productService.getAll();
  }

  @PostMapping("/search")
  public List<Product> search(@RequestBody SearchProductRequest request) {
    return productService.search(request);
  }

  @PostMapping("/manage/delete")
  public TextMessageResponse delete(@RequestBody List<String> ids) {
    return productService.delete(ids);
  }

  @PutMapping("/manage/update")
  public Product update(@RequestBody UpdateProductRequest request) {
    return productService.update(request);
  }

  @PostMapping("/manage/add")
  public Product add(@RequestBody NewProductRequest request) {
    return productService.add(request);
  }

  @GetMapping("/get-by-category")
  public List<Product> getByCategory(@RequestParam(required = false) String id) {
    return productService.getByCategory(id);
  }

  @GetMapping("/get-by-id")
  public Product getById(@RequestParam String id) {
    return productService.getById(id);
  }
}
