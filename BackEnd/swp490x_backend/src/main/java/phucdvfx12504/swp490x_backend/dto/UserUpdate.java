package phucdvfx12504.swp490x_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdate {
    private String id;
    private String fullname;
    private String email;
    private String phone;
}
