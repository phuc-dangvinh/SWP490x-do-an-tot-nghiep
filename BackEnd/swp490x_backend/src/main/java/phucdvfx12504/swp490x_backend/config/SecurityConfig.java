package phucdvfx12504.swp490x_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

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

    // @Bean
    // public UserDetailsService detailsService() {
    // UserDetails user =
    // User.withUsername("admin").password(passwordEncoder().encode("123"))
    // .roles(ERoleName.ADMIN.toString()).build();
    // return new InMemoryUserDetailsManager(user);
    // }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions().disable())
                .authorizeHttpRequests(
                        requests -> requests
                                .requestMatchers(h2ConsoleUrl).permitAll()
                                .requestMatchers("/api/user/register").permitAll()
                                .anyRequest().authenticated())
                // .anyRequest().permitAll())
                .formLogin(form -> form.permitAll())
                .logout(logout -> logout.permitAll()).build();
    }

}
