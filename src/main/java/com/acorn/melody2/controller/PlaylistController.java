package com.acorn.melody2.controller;

import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.service.PlaylistService;
import com.acorn.melody2.service.SongPlaylistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    private static final Logger logger = LoggerFactory.getLogger(PlaylistController.class);

    private final PlaylistService playlistService;
    private final SongPlaylistService songPlaylistService;


    @Autowired
    public PlaylistController(PlaylistService playlistService, SongPlaylistService songPlaylistService) {
        this.playlistService = playlistService;
        this.songPlaylistService = songPlaylistService;
    }

    // Create a new playlist
    @PostMapping
    public Playlist createPlaylist(@RequestBody Playlist playlist) {
        return playlistService.savePlaylist(playlist);
    }


    @PostMapping("/addSong")
    public SongPlaylist addSongToPlaylist(@RequestBody SongPlaylist songPlaylist) {
        logger.warn(songPlaylist.toString());
        int playlistId = songPlaylist.getPlaylistId();
        int songId = songPlaylist.getSongId();
        return songPlaylistService.addSongToPlaylist(playlistId, songId);
    }


    // Read all playlists
    @GetMapping
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    // Read a playlist by ID
    // Read a playlist by ID
    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable Long id) {
        Playlist playlist = playlistService.getSongsByPlaylistId(id);

        if (playlist != null) {
            return ResponseEntity.ok(playlist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a playlist by ID


    @PutMapping("/{id}")
    public Playlist updatePlaylist(@PathVariable Long id, @RequestBody Playlist updatedPlaylist) {
        return playlistService.updatePlaylist(id, updatedPlaylist);
    }

    // Delete a playlist by ID
    @DeleteMapping("/{id}")
    public void deletePlaylist(@PathVariable int id) {
        playlistService.deletePlaylist(id);
    }
}
