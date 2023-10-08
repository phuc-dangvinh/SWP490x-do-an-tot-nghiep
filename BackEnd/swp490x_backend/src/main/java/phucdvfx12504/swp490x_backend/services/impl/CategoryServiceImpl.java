package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.category.CategoryUpdateRequest;
import phucdvfx12504.swp490x_backend.dto.category.NewCategoryRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.Category;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepository;
import phucdvfx12504.swp490x_backend.repositories.CategoryRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.CategoryService;
import phucdvfx12504.swp490x_backend.utils.UpdatePropertyUtils;

@Component
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepository;
  private final UpdatePropertyUtils propertyUtils;
  private final CategoryRepositoryCustom categoryRepositoryCustom;

  @Override
  public List<Category> getAll() {
    return categoryRepository.findAll();
  }

  @Override
  @Transactional
  public TextMessageResponse delete(List<String> ids) {
    categoryRepository.deleteAllById(ids);
    return TextMessageResponse.builder().info("Deleted").build();
  }

  @Override
  @Transactional
  public Category update(CategoryUpdateRequest categoryUpdate) {
    Category category = categoryRepository.findById(categoryUpdate.getId()).orElseThrow();
    propertyUtils.copyNonNullProperties(categoryUpdate, category);
    return categoryRepository.save(category);
  }

  @Override
  public Category addNew(NewCategoryRequest request) {
    return categoryRepository.save(Category.builder().name(request.getName().trim()).build());
  }

  @Override
  public boolean existName(String name) {
    return categoryRepositoryCustom.existName(name);
  }
}
