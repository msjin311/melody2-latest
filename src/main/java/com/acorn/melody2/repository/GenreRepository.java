package com.acorn.melody2.repository;

import com.acorn.melody2.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {
    // You can add custom query methods here if needed
}
