package phucdvfx12504.swp490x_backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.services.FileUploadService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileUploadController {
  private final FileUploadService fileUploadService;

  @PostMapping("/upload")
  public TextMessageResponse uploadFile(@RequestParam MultipartFile file) {
    try {
      return fileUploadService.storeFile(file);
    } catch (Exception e) {
      return null;
    }
  }

  @GetMapping("/get/{fileName:.+}")
  public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
    try {
      return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileUploadService.readFileContent(fileName));
    } catch (Exception e) {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/manage/get-all")
  public List<String> getUploadedFiles() {
    try {
      return fileUploadService.loadAll().map(path -> {
        String urlPath = MvcUriComponentsBuilder
            .fromMethodName(FileUploadController.class, "readDetailFile", path.getFileName().toString())
            .build().toUri().toString();
        return urlPath;
      }).collect(Collectors.toList());
    } catch (Exception exception) {
      return null;
    }
  }

  @DeleteMapping("/manage/delete/{fileName:.+}")
  public boolean deleteFile(@PathVariable String fileName) {
    return fileUploadService.delete(fileName);
  }

  @DeleteMapping("/manage/delete-all")
  public void deleteAllFile() {
    fileUploadService.deleteAll();
  }

}
