package phucdvfx12504.swp490x_backend.auth;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager athenticationManager;
    private final EmailService emailService;

    public User register(UserRegisterRequest request) throws MessagingException, UnsupportedEncodingException {
        String fullname = request.getFullname();
        String email = request.getEmail();
        String password = this.generateCommonLangPassword();
        User user = User.builder()
                .fullname(fullname)
                .email(email)
                .phone(request.getPhone())
                .password(passwordEncoder.encode(password))
                .roles(Set.of(roleRepository.findByName(ERoleName.USER).get()))
                .build();
        String to = request.getEmail();
        String subject = "Sign Up Success";
        String text = this.prepairContent(fullname, email, password);
        // emailService.sendMimeEmail(to, subject, text);
        return userRepository.save(user);
        // String jwtToken = jwtService.generateToken(user);
        // return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse login(UserLoginRequest request) {
        athenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    private String prepairContent(String fullname, String email, String password) {
        String result = "<html><body>Hi {fullname},<br />Welcome to your new account.<br /><br />We inform that you have created an account successfully.<br />Here is info about your account:<br />- Username: {username}<br />- Password: {password}<br />To keep your account safe, you should change your password at the first sign-in.<br /><br />Thank you for your using our service.<br />Best regard!</body></html>";
        result = result.replace("{fullname}", fullname);
        result = result.replace("{username}", email);
        result = result.replace("{password}", password);
        return result;
    }

    private String generateCommonLangPassword() {
        String upperCaseLetters = RandomStringUtils.random(2, 65, 90, true, true);
        String lowerCaseLetters = RandomStringUtils.random(2, 97, 122, true, true);
        String numbers = RandomStringUtils.randomNumeric(2);
        String specialChar = RandomStringUtils.random(2, 33, 47, false, false);
        String totalChars = RandomStringUtils.randomAlphanumeric(2);
        String combinedChars = upperCaseLetters
                .concat(lowerCaseLetters)
                .concat(numbers)
                .concat(specialChar)
                .concat(totalChars);
        List<Character> pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        String password = pwdChars.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return password;
    }

}
