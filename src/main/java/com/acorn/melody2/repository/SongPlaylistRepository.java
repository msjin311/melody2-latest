package com.acorn.melody2.repository;

import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.entity.SongPlaylist.SongPlaylistId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongPlaylistRepository extends JpaRepository<SongPlaylist, SongPlaylistId> {
}
