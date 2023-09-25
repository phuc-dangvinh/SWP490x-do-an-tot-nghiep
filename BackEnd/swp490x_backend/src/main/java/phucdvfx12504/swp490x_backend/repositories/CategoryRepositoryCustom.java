package phucdvfx12504.swp490x_backend.repositories;

import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepositoryCustom {
  boolean existName(String name);
}
