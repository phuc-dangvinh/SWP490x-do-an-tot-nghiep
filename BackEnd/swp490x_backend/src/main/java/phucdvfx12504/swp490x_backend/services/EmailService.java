package phucdvfx12504.swp490x_backend.services;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;

@Service
public interface EmailService {
    void sendSimpleEmail(String mailTo);

    void sendMimeEmail(String to, String subject, String text) throws MessagingException, UnsupportedEncodingException;
}
