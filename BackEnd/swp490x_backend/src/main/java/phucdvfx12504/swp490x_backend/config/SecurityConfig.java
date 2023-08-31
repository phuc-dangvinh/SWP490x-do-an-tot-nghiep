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
import phucdvfx12504.swp490x_backend.auth.AuthEntryPoint;
import phucdvfx12504.swp490x_backend.auth.JwtAuthenticationFilter;
import phucdvfx12504.swp490x_backend.constant.ERoleName;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final AuthenticationProvider authenticationProvider;
	private final AuthEntryPoint authEntryPoint;

	private final AntPathRequestMatcher H2_DATABASE_URL = new AntPathRequestMatcher("/h2-console/**");
	private final String[] PUBLIC_LIST_URL = {
			"/api/auth/login/**",
			"/api/auth/register/**",
			"/home/**",
			"**/reset-password"
	};

	private final String[] ADMIN_ROLE_URL = {
			"/api/user/manage/**"
	};

	private final String[] USER_ROLE_URL = {
			"/api/user/change-password/**"
	};

	// @Bean
	// public WebSecurityCustomizer webSecurityCustomizer() {
	// return (web) -> web.ignoring().requestMatchers(new
	// AntPathRequestMatcher("/home/**"));
	// }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.disable())
				.headers(headers -> headers.frameOptions().disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						requests -> requests
								.requestMatchers(H2_DATABASE_URL).permitAll()
								.requestMatchers(PUBLIC_LIST_URL).permitAll()
								.requestMatchers(ADMIN_ROLE_URL).hasAuthority(ERoleName.ADMIN.toString())
								.requestMatchers(USER_ROLE_URL)
								.hasAnyAuthority(ERoleName.USER.toString(), ERoleName.ADMIN.toString())
								.anyRequest().authenticated())
				// .anyRequest().permitAll())
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint))
				.build();
	}

}
