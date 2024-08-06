package com.vmo.movieapp.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {
    public static SecretKey secretKey = Keys.hmacShaKeyFor("kjbsljdfhjksdahfklhsadfsdkljfhsadjklhfkhadsf".getBytes());

    @Override
    protected void doFilterInternal(
        @Nonnull HttpServletRequest request,
        @Nonnull HttpServletResponse response,
        @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.split(" ", 2)[1];

            // JJWT
            try {
                Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
                Long userId = claims.get("userId", Long.class);
                String role = claims.get("role", String.class);

                // SecurityContextHolder => sau khi dang nhap thi thong tin nguoi dung se dc luu vao trong day
                // spring security se su dung thong tin trong nay
                UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(userId.toString())
                    .roles(role)
                        .password(" ")
                    .build();

                // => phai gan thong tin cua user tuong ung voi token hien tai vao trong SecurityContext
                // principal & credential
                Authentication authentication = new PreAuthenticatedAuthenticationToken(
                    userDetails,
                    null,
                    List.of(new SimpleGrantedAuthority(role))
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException e) {
                // jwt khong hop le
            }
        }

        filterChain.doFilter(request, response);
    }
}
