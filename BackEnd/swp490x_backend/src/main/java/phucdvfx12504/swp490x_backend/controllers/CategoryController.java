package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.category.NewCategoryRequest;
import phucdvfx12504.swp490x_backend.dto.share.DeleteResponse;
import phucdvfx12504.swp490x_backend.entities.Category;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

  @PostMapping("/manage/add-new")
  public Category addNew(@RequestBody NewCategoryRequest request) {
    return null;
  }

}
