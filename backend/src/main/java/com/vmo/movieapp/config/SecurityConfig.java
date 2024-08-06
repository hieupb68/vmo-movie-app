package com.vmo.movieapp.config;

import com.vmo.movieapp.filter.JwtAuthFilter;
import com.vmo.movieapp.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    // component implement UserDetailsService de load user len de check
    // PasswordEncoder
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // => khong ma hoa mat khau
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {
                cors.configurationSource(corsConfigurationSource());
            })
            .csrf(conf -> conf.disable())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/movie/add").hasRole("ADMIN")
                .requestMatchers("/api/movie/get").permitAll()
                    .requestMatchers("/api/movie/getAll").permitAll()
                .requestMatchers("/api/movie/update/{id}").hasRole("ADMIN")
                .requestMatchers("/api/type/add").hasRole("ADMIN")
                .requestMatchers("/api/type/get").permitAll()
                .requestMatchers("/api/authen/login").permitAll()
                .requestMatchers("/api/authen/register").permitAll()
                .requestMatchers("/api/authen/get").hasRole("ADMIN")
                .requestMatchers("/api/authen/delete").hasRole("ADMIN")
                .requestMatchers("/api/feedback/add").authenticated()
                .requestMatchers("/api/feedback/get").permitAll()



                .anyRequest().permitAll() // bat ky request nao den thi nguoi dung deu phai da dang nhap
            )
                .addFilterBefore(new JwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
