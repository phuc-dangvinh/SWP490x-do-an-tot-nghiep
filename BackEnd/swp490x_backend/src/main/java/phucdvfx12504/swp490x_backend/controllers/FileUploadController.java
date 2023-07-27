package phucdvfx12504.swp490x_backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.services.FileUploadService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file-upload")
public class FileUploadController {
  private final FileUploadService fileUploadService;

  @PostMapping
  public String uploadFile(@RequestParam("file") MultipartFile file) {
    try {
      return fileUploadService.storeFile(file);
    } catch (Exception e) {
      return "";
    }
  }

  @GetMapping("file/{fileName:.+}")
  public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
    try {
      return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileUploadService.readFileContent(fileName));
    } catch (Exception e) {
      return ResponseEntity.noContent().build();
    }
  }

}
