package phucdvfx12504.swp490x_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import phucdvfx12504.swp490x_backend.services.EmailService;

@Component
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendSimpleEmail(String mailTo) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(mailTo);
        mailMessage.setSubject("Activate Your Account");
        mailMessage.setText("Click here to activate to your account!");
        mailSender.send(mailMessage);
    }

    @Override
    public void sendMimeEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        // format content with HTML
        message.setContent("content", "text/html");
        // FileSystemResource attachmentFile = new FileSystemResource(new File(filePath));
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(text);
        // messageHelper.addAttachment("file_attachment", attachmentFile);
        mailSender.send(message);
    }

}
