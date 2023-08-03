package phucdvfx12504.swp490x_backend.auth;

import java.io.UnsupportedEncodingException;
import java.util.Set;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.dto.user.AuthenticationResponse;
import phucdvfx12504.swp490x_backend.dto.user.UserLoginRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserRegisterRequest;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.utils.CommonLangPasswordUtils;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager athenticationManager;
    private final CommonLangPasswordUtils commonLangPasswordUtils;

    @Transactional
    public User register(UserRegisterRequest request)
            throws MessagingException, UnsupportedEncodingException {
        User user = User.builder()
                .avatar(request.getAvatar())
                .fullname(request.getFullname())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(commonLangPasswordUtils.generateCommonLangPassword()))
                .roles(Set.of(roleRepository.findByName(request.getIsAdmin() ? ERoleName.ADMIN : ERoleName.USER).get()))
                .build();
        return userRepository.save(user);
        // return TextMessageResponse.builder().info("Register successfully!").build();
        // String jwtToken = jwtService.generateToken(user);
        // return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse login(UserLoginRequest request) {
        athenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().user(user).token(jwtToken).build();
    }

}
