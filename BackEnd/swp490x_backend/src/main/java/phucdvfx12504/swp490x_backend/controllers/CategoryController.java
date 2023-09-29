package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.category.CategoryUpdateRequest;
import phucdvfx12504.swp490x_backend.dto.category.NewCategoryRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
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

  @GetMapping("/get-all")
  public List<Category> getAll() {
    return categoryService.getAll();
  }

  @PostMapping("/manage/delete")
  public TextMessageResponse delete(@RequestBody String id) {
    return categoryService.delete(id);
  }

  @PostMapping("/manage/exist")
  public boolean existName(@RequestBody String name) {
    if (name.isBlank()) {
      return false;
    } else {
      return categoryService.existName(name);
    }
  }

  @PutMapping("/manage/update")
  public Category update(@RequestBody CategoryUpdateRequest request) {
    return categoryService.update(request);
  }

}
