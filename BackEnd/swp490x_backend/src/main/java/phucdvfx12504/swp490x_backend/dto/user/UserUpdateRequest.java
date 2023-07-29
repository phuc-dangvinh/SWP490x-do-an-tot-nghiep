package phucdvfx12504.swp490x_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String id;
    private String avatar;
    private String fullname;
    private String email;
    private String phone;
    private Boolean isAdmin;
}
