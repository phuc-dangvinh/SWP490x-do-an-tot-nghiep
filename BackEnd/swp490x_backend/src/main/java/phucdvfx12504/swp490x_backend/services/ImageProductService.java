package phucdvfx12504.swp490x_backend.services;

import org.springframework.web.multipart.MultipartFile;

import phucdvfx12504.swp490x_backend.dto.image.product.ImageProductDeleteRequest;
import phucdvfx12504.swp490x_backend.dto.image.product.SetImageProductRequest;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.entities.ImageProduct;

public interface ImageProductService {
  ImageProduct upload(MultipartFile file);

  TextMessageResponse delete(ImageProductDeleteRequest image);

  ImageProduct setProduct(SetImageProductRequest request);
}
