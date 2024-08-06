package com.vmo.movieapp.repository;

import com.vmo.movieapp.entity.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackListRepository extends JpaRepository<BlackList,Long> {
}
