package phucdvfx12504.swp490x_backend.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
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

	private final AntPathRequestMatcher[] PUBLIC_LIST_URL = {
			new AntPathRequestMatcher("/h2-console/**"),
			new AntPathRequestMatcher("/**/login/**"),
			new AntPathRequestMatcher("/**/register/**"),
			new AntPathRequestMatcher("/**/user/reset-password/**"),
			new AntPathRequestMatcher("/**/category/get-all/**"),
			new AntPathRequestMatcher("/**/file/get/**"),
			new AntPathRequestMatcher("/**/product/get-all/**"),
			new AntPathRequestMatcher("/**/product/get-by-category/**"),
			new AntPathRequestMatcher("/**/product/get-by-id/**"),
			new AntPathRequestMatcher("/**/product/search/**")
	};
	private final AntPathRequestMatcher[] ADMIN_ROLE_URL = {
			new AntPathRequestMatcher("/**/manage/**")
	};

	private final AntPathRequestMatcher[] USER_ROLE_URL = {
			new AntPathRequestMatcher("/**/user/change-password/**"),
			new AntPathRequestMatcher("/**/user/check-exist/**"),
			new AntPathRequestMatcher("/**/user/check-current-password/**"),
			new AntPathRequestMatcher("/**/file/upload/**"),
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// https://reflectoring.io/spring-cors/
		return http
				.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(request -> {
					CorsConfiguration configuration = new CorsConfiguration();
					configuration.setAllowedOrigins(Arrays.asList("*"));
					configuration.setAllowedMethods(Arrays.asList("*"));
					configuration.setAllowedHeaders(Arrays.asList("*"));
					configuration.setExposedHeaders(Arrays.asList("*"));
					// configuration.setAllowCredentials(true);
					return configuration;
				}))
				.headers(headers -> headers.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						requests -> requests
								.requestMatchers(PUBLIC_LIST_URL).permitAll()
								.requestMatchers(ADMIN_ROLE_URL).hasAuthority(ERoleName.ADMIN.toString())
								.requestMatchers(USER_ROLE_URL).hasAnyAuthority(ERoleName.USER.toString(), ERoleName.ADMIN.toString())
								.anyRequest().authenticated())
				// .anyRequest().permitAll())
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint))
				.build();
	}
}
