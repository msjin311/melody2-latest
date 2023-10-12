package com.acorn.melody2.repository;

import com.acorn.melody2.entity.GroupArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupArtistRepository extends JpaRepository<GroupArtist, Integer> {
}
