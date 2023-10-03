package phucdvfx12504.swp490x_backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.image.product.ImageProductDeleteRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.repositories.ImageProductRepository;
import phucdvfx12504.swp490x_backend.repositories.ProductRepository;
import phucdvfx12504.swp490x_backend.services.FileUploadService;
import phucdvfx12504.swp490x_backend.services.ImageProductService;

@Component
@RequiredArgsConstructor
public class ImageProductServiceImpl implements ImageProductService {
  private final FileUploadService fileUploadService;
  private final ImageProductRepository imageProductRepository;
  private final ProductRepository productRepository;

  @Override
  @Transactional
  public ImageProduct upload(MultipartFile file) {
    String fileNameUpload = fileUploadService.storeFile(file).getInfo();
    return imageProductRepository.save(ImageProduct.builder().fileName(fileNameUpload).build());
  }

  @Override
  @Transactional
  public TextMessageResponse delete(List<ImageProductDeleteRequest> images) {
    for (ImageProductDeleteRequest image : images) {
      imageProductRepository.deleteById(image.getId());
      fileUploadService.delete(image.getFileName());
    }
    return TextMessageResponse.builder().info("Deleted").build();
  }

}
