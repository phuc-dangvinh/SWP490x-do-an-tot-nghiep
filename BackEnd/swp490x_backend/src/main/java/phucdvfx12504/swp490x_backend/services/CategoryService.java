package phucdvfx12504.swp490x_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.category.CategoryUpdateRequest;
import phucdvfx12504.swp490x_backend.dto.category.NewCategoryRequest;
import phucdvfx12504.swp490x_backend.entities.Category;

@Service
public interface CategoryService {
  Category addNew(NewCategoryRequest request)

  List<Category> getAll();

  void delete(List<String> ids);

  Category update(CategoryUpdateRequest categoryUpdate);
}
