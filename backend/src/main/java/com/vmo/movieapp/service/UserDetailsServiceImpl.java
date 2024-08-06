package com.vmo.movieapp.service;

import com.vmo.movieapp.entity.Role;
import com.vmo.movieapp.entity.User;
import com.vmo.movieapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Username not found: " + username);
        }

        Role role = user.getRole();

        return org.springframework.security.core.userdetails.User.withUsername(username)
            .password(user.getPassword())
                .roles(role.getName())
            .build();
    }
}
