package phucdvfx12504.swp490x_backend.dto.user;

import lombok.Getter;

@Getter
public class UserRegisterRequest {
    private String avatar;
    private String fullname;
    private String email;
    private String phone;
    private Boolean isAdmin;
}
