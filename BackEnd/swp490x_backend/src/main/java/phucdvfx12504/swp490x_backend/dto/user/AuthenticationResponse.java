package phucdvfx12504.swp490x_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import phucdvfx12504.swp490x_backend.entities.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    public String token;
    public User user;
}
