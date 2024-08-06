package com.vmo.movieapp.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.vmo.movieapp.dto.AuthResp;
import com.vmo.movieapp.dto.LoginDTO;
import com.vmo.movieapp.dto.UserDTO;
import com.vmo.movieapp.entity.Role;
import com.vmo.movieapp.entity.User;
import com.vmo.movieapp.filter.JwtAuthFilter;
import com.vmo.movieapp.helper.GoogleHelper;
import com.vmo.movieapp.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final GoogleHelper googleHelper;

    public void register(String username, String password) {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        Role role = new Role();
        role.setId(2); // assuming 2 is the role ID for a standard user
        user.setRole(role);
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserDTO> getUser() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : users) {
            userDTOList.add(new UserDTO(user));
        }
        return userDTOList;
    }

    public Map<String, Object> login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername());

        if (user == null) {
            throw new RuntimeException("Username does not exist");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        String token = generateAccessToken(user);
        UserDTO userDTO = new UserDTO(user);

        return Map.of(
            "user", userDTO,
            "token", token
        );
    }

    public AuthResp loginWithGoogle(String token) {
        String email = googleHelper.getInfoFromToken(token).getEmail();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User does not exist with email " + email);
        }

        return AuthResp.builder()
            .accessToken(generateAccessToken(user))
            .user(new UserDTO(user))
            .build();
    }

    private String generateAccessToken(User user) {
        return Jwts.builder()
            .signWith(JwtAuthFilter.secretKey)
            .claims(Map.of(
                "userId", user.getId(),
                "role", user.getRole().getName()
            )).compact();
    }
}
