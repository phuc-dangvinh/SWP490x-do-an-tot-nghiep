package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.category.CategoryUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepository;
import phucdvfx12504.swp490x_backend.services.CategoryService;
import phucdvfx12504.swp490x_backend.utils.PropertyUtils;

@Component
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepository;
  private final PropertyUtils propertyUtils;

  @Override
  public List<Category> getAll() {
    return categoryRepository.findAll();
  }

  @Override
  @Transactional
  public void delete(List<String> ids) {
    for (String id : ids) {
      categoryRepository.deleteById(id);
    }
  }

  @Override
  @Transactional
  public Category update(CategoryUpdateRequest categoryUpdate) {
    Category category = categoryRepository.findById(categoryUpdate.getId()).orElseThrow();
    propertyUtils.copyNonNullProperties(categoryUpdate, category);
    return categoryRepository.save(category);
  }

}
