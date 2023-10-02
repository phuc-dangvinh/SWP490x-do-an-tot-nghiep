package phucdvfx12504.swp490x_backend.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.image.product.ImageProductDeleteRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.services.ImageProductService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image/product")
public class ImageProductController {
  private final ImageProductService imageProductService;

  @PostMapping("/manage/upload")
  public ImageProduct upload(@RequestParam MultipartFile file) {
    return imageProductService.upload(file);
  }

  @DeleteMapping("/manage/delete")
  public TextMessageResponse delete(@RequestBody ImageProductDeleteRequest request) {
    return imageProductService.delete(request);
  }
}
