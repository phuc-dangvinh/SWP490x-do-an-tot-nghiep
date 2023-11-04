package phucdvfx12504.swp490x_backend.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class EmailConfig {
    @Value("${spring.mail.host}")
    private String mailServerHost;
    @Value("${spring.mail.port}")
    private Integer mailServerPort;
    @Value("${spring.mail.username}")
    private String mailServerUsername;
    @Value("${spring.mail.password}")
    private String mailServerPassword;
    @Value("${spring.mail.properties.mail.smtp.auth}")
    private boolean mailServerAuth;
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private boolean mailServerStartTls;

    // private String mailServerHost = "smtp.gmail.com";
    // private Integer mailServerPort = 587;
    // private String mailServerUsername = "vinhphuc989@gmail.com";
    // private String mailServerPassword = "pawlnoaatukbclbr";
    // private boolean mailServerAuth = true;
    // private boolean mailServerStartTls = true;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailServerHost);
        mailSender.setPort(mailServerPort);
        mailSender.setUsername(mailServerUsername);
        mailSender.setPassword(mailServerPassword);
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", mailServerAuth);
        properties.put("mail.smtp.starttls.enable", mailServerStartTls);
        properties.put("mail.debug", "true");
        return mailSender;
    }
}
