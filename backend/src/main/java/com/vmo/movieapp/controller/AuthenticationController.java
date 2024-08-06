package com.vmo.movieapp.controller;

import com.vmo.movieapp.dto.*;
import com.vmo.movieapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/authen")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * Tra ve access token
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {
        Map<String, Object> response = authenticationService.login(loginDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/google")
    public AuthResp loginWithGoogle(@RequestBody String token) {
        return authenticationService.loginWithGoogle(token);
    }

    @PostMapping("/register")
    void register(@RequestBody Register register) {
        authenticationService.register(register.getUsername(), register.getPassword());
    }

    @DeleteMapping("/delete")
    void delete(@RequestParam Long id) {
        authenticationService.deleteUser(id);
    }

    @GetMapping("/get")
    public List<UserDTO> getUser(){
        return authenticationService.getUser();
    }
}
