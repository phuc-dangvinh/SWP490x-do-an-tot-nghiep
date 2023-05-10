package phucdvfx12504.swp490x_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private AntPathRequestMatcher h2ConsoleUrl = new AntPathRequestMatcher("/h2-console/**");
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    // @Bean
    // public WebSecurityCustomizer webSecurityCustomizer() {
    // return (web) -> web.ignoring().requestMatchers("/**");
    // }

    // @Bean
    // public PasswordEncoder passwordEncoder() {
    // return new BCryptPasswordEncoder();
    // }

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
                                // .requestMatchers("/api/user/register").permitAll()
                                .requestMatchers("/api/user/register", "/api/auth/register/**",
                                        "/api/auth/authenticate/**")
                                .permitAll()
                                // .requestMatchers("/api/auth/authenticate/**").permitAll()
                                .anyRequest().authenticated())
                // .anyRequest().permitAll())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.permitAll())
                .logout(logout -> logout.permitAll()).build();
    }

}
