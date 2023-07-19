package phucdvfx12504.swp490x_backend.services.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.dto.share.TextMessageResponse;
import phucdvfx12504.swp490x_backend.dto.user.CheckExistUserRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserChangePasswordRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserChangeRoleRequest;
import phucdvfx12504.swp490x_backend.dto.user.UserUpdateRequest;
import phucdvfx12504.swp490x_backend.entities.Role;
import phucdvfx12504.swp490x_backend.entities.User;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepository;
import phucdvfx12504.swp490x_backend.repositories.UserRepositoryCustom;
import phucdvfx12504.swp490x_backend.services.EmailService;
import phucdvfx12504.swp490x_backend.services.RoleService;
import phucdvfx12504.swp490x_backend.services.UserService;
import phucdvfx12504.swp490x_backend.utils.CommonLangPasswordUtils;
import phucdvfx12504.swp490x_backend.utils.UpdatePropertyUtils;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRepositoryCustom userRepositoryCustom;
    private final RoleRepository roleRepository;
    private final UpdatePropertyUtils propertyUtils;
    private final PasswordEncoder passwordEncoder;
    private final CommonLangPasswordUtils commonLangPasswordUtils;
    private final EmailService emailService;
    private final RoleService roleService;;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getFilter(String keyword) {
        return userRepositoryCustom.getFilter(keyword);
    }

    @Override
    @Transactional
    public TextMessageResponse delete(List<String> ids) {
        int countAdmin = 0;
        Role adminRole = roleRepository.findByName(ERoleName.ADMIN).get();
        for (String id : ids) {
            User user = userRepository.findById(id).get();
            if (!user.getRoles().contains(adminRole)) {
                userRepository.deleteById(id);
            } else {
                countAdmin++;
            }
        }
        if (countAdmin == 0) {
            return TextMessageResponse.builder().message("Delete successfully!").build();
        } else {
            return TextMessageResponse.builder().message("Delete failed").build();
        }
    }

    @Override
    @Transactional
    public TextMessageResponse update(UserUpdateRequest userUpdate) {
        ERoleName roleNameUpdate = userUpdate.getIsAdmin() ? ERoleName.ADMIN : ERoleName.USER;
        User user = userRepository.findById(userUpdate.getId()).orElseThrow();
        propertyUtils.copyNonNullProperties(userUpdate, user);
        if (!hasRoleName(user, ERoleName.ADMIN) && !hasRoleName(user, roleNameUpdate)) {
            user.setRoles(roleService.getSetRoles(roleNameUpdate));
        }
        userRepository.save(user);
        return TextMessageResponse.builder().message("Update successfully!").build();
    }

    @Override
    public User changePassword(UserChangePasswordRequest userChangePasswordRequest) {
        User user = userRepository.findByEmail(userChangePasswordRequest.getEmail()).orElseThrow();
        String oldRawPassword = userChangePasswordRequest.getOldPassword();
        String newRawPassword = userChangePasswordRequest.getNewPassword();
        if (!newRawPassword.isEmpty() && passwordEncoder.matches(oldRawPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newRawPassword));
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public TextMessageResponse resetPassword(List<String> ids) throws UnsupportedEncodingException, MessagingException {
        for (String id : ids) {
            User user = userRepository.findById(id).orElseThrow();
            String newPassword = commonLangPasswordUtils.generateCommonLangPassword();
            user.setPassword(passwordEncoder.encode(passwordEncoder.encode(newPassword)));
            // send email
            String to = user.getEmail();
            String subject = "Reset password successfully";
            String text = this.replaceEmailContent(newPassword);
            emailService.sendMimeEmail(to, subject, text);
            //
            userRepository.save(user);
        }
        return TextMessageResponse.builder().message("Reset password successfully!").build();
    }

    private String replaceEmailContent(String password) {
        String result = "<html>\r\n" + //
                "  <body>\r\n" + //
                "    You have successfully reset your password.<br />\r\n" + //
                "    Your new password is: <b>{password}</b><br /><br />\r\n" + //
                "    Thank you for your using our service.\r\n" + //
                "  </body>\r\n" + //
                "</html>";
        result = result.replace("{password}", password);
        return result;
    }

    @Override
    public boolean checkExist(CheckExistUserRequest user) {
        return userRepository.existsByEmail(user.getEmail());
    }

    @Override
    public boolean hasRoleName(User user, ERoleName roleName) {
        boolean result = false;
        Set<Role> roles = user.getRoles();
        for (Role role : roles) {
            if (role.getName() == roleName) {
                result = true;
            }
        }
        return result;
    }

    @Override
    @Transactional
    public TextMessageResponse changeRole(UserChangeRoleRequest changeRoleRequest) {
        ERoleName roleNameUpdate = changeRoleRequest.getIsAdmin() ? ERoleName.ADMIN : ERoleName.USER;
        User user = userRepository.findById(changeRoleRequest.getId()).orElseThrow();
        if (!hasRoleName(user, ERoleName.ADMIN) && !hasRoleName(user, roleNameUpdate)) {
            user.setRoles(roleService.getSetRoles(roleNameUpdate));
        }
        userRepository.save(user);
        return TextMessageResponse.builder().message("Change successfully!").build();
    }

}
