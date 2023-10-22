package phucdvfx12504.swp490x_backend.dto.user;

import lombok.Getter;

@Getter
public class UserChangePasswordRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
}
