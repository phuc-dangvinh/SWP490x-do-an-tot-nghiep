package phucdvfx12504.swp490x_backend.services;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
  boolean isImageFile(MultipartFile file);

  String storeFile(MultipartFile file);

  Stream<Path> loadAll();

  byte[] readFileContent(String fileName);

  boolean delete(String filename);

  void deleteAll();
}
