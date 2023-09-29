package phucdvfx12504.swp490x_backend.services.impl;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;
import phucdvfx12504.swp490x_backend.repositories.ImageProductRepository;
import phucdvfx12504.swp490x_backend.services.FileUploadService;
import phucdvfx12504.swp490x_backend.services.ImageProductService;

@Component
@RequiredArgsConstructor
public class ImageProductServiceImpl implements ImageProductService {
  private final FileUploadService fileUploadService;
  private final ImageProductRepository imageProductRepository;

  @Override
  @Transactional
  public ImageProduct upload(MultipartFile file) {
    String fileNameUpload = fileUploadService.storeFile(file).getInfo();
    return imageProductRepository.save(ImageProduct.builder().fileName(fileNameUpload).build());
  }

  @Override
  @Transactional
  public TextMessageResponse delete(String id) {
    ImageProduct imageProduct = imageProductRepository.findById(id).orElseThrow();
    imageProductRepository.deleteById(id);
    fileUploadService.delete(imageProduct.getFileName());
    return TextMessageResponse.builder().info("Deleted").build();
  }
}
