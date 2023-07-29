package phucdvfx12504.swp490x_backend.services;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;

public interface FileUploadService {
  boolean isImageFile(MultipartFile file);

  TextMessageResponse storeFile(MultipartFile file);

  Stream<Path> loadAll();

  byte[] readFileContent(String fileName);

  boolean delete(String filename);

  void deleteAll();
}
