package phucdvfx12504.swp490x_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChangeRoleRequest {
  private String id;
  private Boolean isAdmin;
}
