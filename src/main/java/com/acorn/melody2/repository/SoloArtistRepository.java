package com.acorn.melody2.repository;

import com.acorn.melody2.entity.SoloArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoloArtistRepository extends JpaRepository<SoloArtist, Integer> {
}
