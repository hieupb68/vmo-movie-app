package com.vmo.movieapp.repository;

import com.vmo.movieapp.entity.Movie;
import com.vmo.movieapp.entity.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Truong ID thi no se duoc danh index => tim kiem rat nhanh
    // Specification QueryDSL
    @Query("""
        SELECT m FROM Movie m
        WHERE (:key IS NULL OR m.title LIKE %:key%) AND (:type IS NULL OR :type MEMBER OF m.types)
    """)
    Page<Movie> findAllByKeywordAndType(@Param("key") String keyword, @Param("type") Type type, Pageable pageable); // HQL (Hibernate Query Language), JPQL (JPA Query Language); % => wildcard
}
