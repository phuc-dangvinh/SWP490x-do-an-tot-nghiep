package phucdvfx12504.swp490x_backend.dto.user;

import lombok.Getter;

@Getter
public class CheckCurrentPasswordRequest {
  private String email;
  private String password;
}
