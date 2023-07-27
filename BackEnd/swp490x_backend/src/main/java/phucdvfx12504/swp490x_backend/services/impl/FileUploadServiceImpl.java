package phucdvfx12504.swp490x_backend.services.impl;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Stream;

import javax.management.RuntimeErrorException;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.services.FileUploadService;

@Component
public class FileUploadServiceImpl implements FileUploadService {
  private final Path storageFolder = Paths.get("upload");

  public FileUploadServiceImpl() {
    try {
      Files.createDirectories(storageFolder);
    } catch (IOException exception) {
      throw new RuntimeException("Cannot initialize storage", exception);
    }
  }

  @Override
  public boolean isImageFile(MultipartFile file) {
    String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
    return Arrays.asList(new String[] { "png", "jpg", "jpeg", "bmp" }).contains(fileExtension.trim().toLowerCase());
  }

  @Override
  public String storeFile(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new RuntimeException("Failed to store empty file");
      }
      if (!isImageFile(file)) {
        throw new RuntimeException("You can only upload image file");
      }
      float fileSizeInMegabytes = (float) (file.getSize() / Math.pow(1024, 2));
      if (fileSizeInMegabytes > 5.0f) {
        throw new RuntimeException("File must be <= 5Mb");
      }
      String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
      String generatedFileName = UUID.randomUUID().toString().replace("-", "");
      generatedFileName = generatedFileName + "." + fileExtension;
      Path destinationFilePath = this.storageFolder.resolve(Paths.get(generatedFileName)).normalize().toAbsolutePath();
      if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
        throw new RuntimeException("Cannot store file outside current directory");
      }
      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
      }
      return generatedFileName;
    } catch (IOException exception) {
      throw new RuntimeException("Failed to store file", exception);
    }
  }

  @Override
  public Stream<Path> loadAll() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'loadAll'");
  }

  @Override
  public byte[] readFileContent(String fileName) {
    try {
      Path file = storageFolder.resolve(fileName);
      Resource resource = new UrlResource(file.toUri());
      if (resource.exists() || resource.isReadable()) {
        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
        return bytes;
      } else {
        throw new RuntimeException("Could not read file: " + fileName);
      }
    } catch (Exception exception) {
      throw new RuntimeException("Could not read file: " + fileName, exception);
    }
  }

  @Override
  public void deleteAllFiles() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteAllFiles'");
  }

}
