package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.category.NewCategoryRequest;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.services.CategoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
  private final CategoryService categoryService;

  @PostMapping("/manage/add-new")
  public Category addNew(@RequestBody NewCategoryRequest request) {
    return categoryService.addNew(request);
  }

  @GetMapping("/manage/get-all")
  public List<Category> getAll() {
    return categoryService.getAll();
  }

}
