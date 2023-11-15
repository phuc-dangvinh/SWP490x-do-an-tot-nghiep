package phucdvfx12504.swp490x_backend.dto.user;

import lombok.Getter;
import phucdvfx12504.swp490x_backend.constant.Gender;

@Getter
public class UserUpdateRequest {
    private String id;
    private String avatar;
    private String fullname;
    private String email;
    private String phone;
    private Boolean isAdmin;
    private Gender gender;
    private String address;
}
