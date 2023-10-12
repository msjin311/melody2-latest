package com.acorn.melody2.controller;

import com.acorn.melody2.entity.Song;
import com.acorn.melody2.service.SongService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private static final Logger logger = LoggerFactory.getLogger(SongController.class);

    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    // Create a new song
    @PostMapping
    public Song createSong(@RequestBody Song song) {
        return songService.saveSong(song);
    }

    // Read all songs
    @GetMapping
    public List<Song> getAllSongs() {
        logger.warn("test message");
        return songService.getAllSongs();
    }

    // Read a song by ID
    @GetMapping("/{id}")
    public Optional<Song> getSongById(@PathVariable int id) {
        return songService.getSongById(id);
    }

    // Search songs by title
    @GetMapping("/search")
    public List<Song> searchSongsByTitle(@RequestParam String title) {
        List<Song> songs = songService.searchSongsByTitle(title);
        logger.warn("Songs found: {}", songs); // Log the list as a string
        return songs;
    }

    // Update a song by ID
    @PutMapping("/{id}")
    public Song updateSong(@PathVariable int id, @RequestBody Song updatedSong) {
        return songService.updateSong(id, updatedSong);
    }

    // Delete a song by ID
    @DeleteMapping("/{id}")
    public void deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
    }
}
