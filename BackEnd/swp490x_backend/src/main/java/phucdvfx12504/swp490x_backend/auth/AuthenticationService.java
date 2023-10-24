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
import phucdvfx12504.swp490x_backend.dto.user.AuthenticationResponse;
import phucdvfx12504.swp490x_backend.dto.user.UserLoginRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserRegisterRequest;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.services.EmailService;
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
  private final EmailService emailService;
  // private final UserDetailsService userDetailsService;
  // private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationService.class);

  @Transactional
  public User register(UserRegisterRequest request)
      throws MessagingException, UnsupportedEncodingException {
    String rawPasswordGenerate = commonLangPasswordUtils.generateCommonLangPassword();
    User userRequest = User.builder()
        .avatar(request.getAvatar())
        .fullname(request.getFullname().trim())
        .email(request.getEmail().toLowerCase().trim())
        .phone(request.getPhone().trim())
        .password(passwordEncoder.encode(rawPasswordGenerate))
        .roles(Set.of(roleRepository.findByName(request.getIsAdmin() ? ERoleName.ADMIN : ERoleName.USER).get()))
        .build();
    User userSaveSuccess = userRepository.save(userRequest);
    // send email
    String to = userSaveSuccess.getEmail();
    String subject = "Sign up success";
    String text = this.replaceEmailContent(
        userSaveSuccess.getFullname(), userSaveSuccess.getEmail(), rawPasswordGenerate);
    emailService.sendMimeEmail(to, subject, text);
    //
    return userSaveSuccess;
  }

  public AuthenticationResponse login(UserLoginRequest request) {
    athenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
    String jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder().user(user).token(jwtToken).build();
  }

  // public boolean checkValidToken(String token) {
  //   if (token == null || !token.startsWith("Bearer")) {
  //     return false;
  //   } else {
  //     try {
  //       final String jwt = token.substring(7);
  //       final String email = jwtService.extractEmail(jwt);
  //       if (email != null) {
  //         UserDetails userDetails = userDetailsService.loadUserByUsername(email);
  //         return jwtService.isTokenValid(jwt, userDetails);
  //       }
  //     } catch (Exception e) {
  //       LOGGER.error("Cannot check valid token: {}", e.getMessage());
  //     }
  //     return false;
  //   }
  // }

  private String replaceEmailContent(String fullname, String email, String password) {
    String content = "<html>\r\n" + //
        "  <body>\r\n" + //
        "    Hi {fullname},\r\n" + //
        "    <br />\r\n" + //
        "    You have created an account successfully.\r\n" + //
        "    <br />\r\n" + //
        "    <br />\r\n" + //
        "    Here is info about your account:\r\n" + //
        "    <br />\r\n" + //
        "    - Username: {email}\r\n" + //
        "    <br />\r\n" + //
        "    - Password: {password}\r\n" + //
        "    <br />\r\n" + //
        "    To keep your account safe, you should change your password at the first\r\n" + //
        "    sign-in.\r\n" + //
        "    <br />\r\n" + //
        "    <br />\r\n" + //
        "    Thank you for your using our service.\r\n" + //
        "    <br />\r\n" + //
        "    Best regard!\r\n" + //
        "  </body>\r\n" + //
        "</html>";
    content = content.replace("{fullname}", fullname);
    content = content.replace("{email}", email);
    content = content.replace("{password}", password);
    return content;
  }

}
