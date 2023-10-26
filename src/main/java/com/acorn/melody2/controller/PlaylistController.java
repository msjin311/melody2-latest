package com.acorn.melody2.controller;

import com.acorn.melody2.dto.UpdatePlaylistRequest;
import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.service.PlaylistService;
import com.acorn.melody2.service.SongPlaylistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/deleteSong")
    public ResponseEntity<Void> removeSongFromPlaylist (@RequestBody SongPlaylist songPlaylist){
        logger.warn(songPlaylist.toString());
        int songId = songPlaylist.getSongId();
        int playlistId = songPlaylist.getPlaylistId();
        songPlaylistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.noContent().build();
    }


    // Read all playlists
    @GetMapping
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/playlist/{id}")
    public ResponseEntity<List<Playlist>> getPlaylistsByuserAccountId(@PathVariable Long id) {
        logger.warn(String.valueOf(id));
        List<Playlist> playlists = playlistService.getPlaylistsByuserAccountId(id);
        if(playlists.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(playlists, HttpStatus.OK);
        }
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

    @PutMapping
    public Playlist updatePlaylist(@RequestBody UpdatePlaylistRequest updatedPlaylistRequest) {
        logger.warn(String.valueOf(updatedPlaylistRequest));
        Long playlistId = updatedPlaylistRequest.getPlaylist().getPlaylistId();
        Playlist playlist = updatedPlaylistRequest.getPlaylist();
        logger.warn(playlistId.toString());
        logger.warn(playlist.toString());
        return playlistService.updatePlaylist(playlistId,playlist);
    }

    // Delete a playlist by ID
    @DeleteMapping("/{id}")
    public void deletePlaylist(@PathVariable int id) {
        playlistService.deletePlaylist(id);
    }

    @GetMapping("/songs/{id}")
    public Playlist getSongsById(@PathVariable Long id){ return playlistService.getSongsByPlaylistId(id); }
}
