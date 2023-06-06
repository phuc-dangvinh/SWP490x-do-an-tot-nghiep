package phucdvfx12504.swp490x_backend.services;

import java.io.UnsupportedEncodingException;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendSimpleEmail(String mailTo);

    void sendMimeEmail(String to, String subject, String text) throws MessagingException, UnsupportedEncodingException;
}
