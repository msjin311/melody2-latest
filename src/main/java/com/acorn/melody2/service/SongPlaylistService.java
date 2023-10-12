package com.acorn.melody2.service;

import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.repository.SongPlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongPlaylistService {

    private final SongPlaylistRepository songPlaylistRepository;

    @Autowired
    public SongPlaylistService(SongPlaylistRepository songPlaylistRepository) {
        this.songPlaylistRepository = songPlaylistRepository;
    }

    public List<SongPlaylist> getAllSongPlaylists() {
        return songPlaylistRepository.findAll();
    }

    public Optional<SongPlaylist> getSongPlaylistById(int playlistId, int songId) {
        return songPlaylistRepository.findById(new SongPlaylist.SongPlaylistId(playlistId, songId));
    }

    public SongPlaylist saveSongPlaylist(SongPlaylist songPlaylist) {
        return songPlaylistRepository.save(songPlaylist);
    }

    public void deleteSongPlaylist(int playlistId, int songId) {
        songPlaylistRepository.deleteById(new SongPlaylist.SongPlaylistId(playlistId, songId));
    }
}
