package phucdvfx12504.swp490x_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import phucdvfx12504.swp490x_backend.constant.ERole;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private AntPathRequestMatcher h2ConsoleUrl = new AntPathRequestMatcher("/h2-console/**");

    // @Bean
    // public WebSecurityCustomizer webSecurityCustomizer() {
    // return (web) -> web.ignoring().requestMatchers("/**");
    // }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().disable()
                .csrf().disable()
                .headers().frameOptions().disable();
        http
                .authorizeHttpRequests(
                        requests -> requests
                                .requestMatchers(h2ConsoleUrl).permitAll()
                                .requestMatchers("/", "/home").permitAll()
                                .anyRequest().authenticated())
                .formLogin(form -> form.permitAll())
                .logout(logout -> logout.permitAll());
        return http.build();
    }

    @Bean
    public UserDetailsService detailsService() {
        UserDetails user = User.withUsername("admin").password(passwordEncoder().encode("123"))
                .roles(ERole.ADMIN.toString()).build();
        return new InMemoryUserDetailsManager(user);
    }

}
