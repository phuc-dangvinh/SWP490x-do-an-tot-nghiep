package phucdvfx12504.swp490x_backend.repositories;

import java.util.List;

import phucdvfx12504.swp490x_backend.entities.ImageProduct;

public interface ImageProductRepositoryCustom {
  List<ImageProduct> findImagesNotSetProduct();
}
