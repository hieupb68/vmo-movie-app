package com.vmo.movieapp.repository;

import com.vmo.movieapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("""
        SELECT u
        FROM User u
        WHERE u.username = :username
    """)
    User findByUsername(@Param("username") String username);

    User findByEmail(String email);
}
