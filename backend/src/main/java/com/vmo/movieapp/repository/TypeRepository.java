package com.vmo.movieapp.repository;

import com.vmo.movieapp.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type, Long> {
}
