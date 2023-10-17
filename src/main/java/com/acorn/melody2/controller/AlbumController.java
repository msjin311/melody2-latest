package com.acorn.melody2.controller;

import com.acorn.melody2.dto.UpdateLikeRequest;
import com.acorn.melody2.entity.Album;
import com.acorn.melody2.service.AlbumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;

    private static final Logger logger = LoggerFactory.getLogger(AlbumController.class);

    @Autowired
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }


    @GetMapping
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/search")
    public List<Album> searchAlbumsByTitle(@RequestParam String title) {
        List<Album> albums = albumService.searchAlbumsByTitle(title);
        logger.warn("Albums found: {}", albums); // Log the list as a string
        return albums;
    }

    // Get the number of likes for an album
    @PostMapping("/likes")
    public ResponseEntity<Album> updateAlbumLikes(@RequestBody UpdateLikeRequest updateLikeRequest) throws ChangeSetPersister.NotFoundException {
        int albumId = updateLikeRequest.getAlbumId();

        Optional<Album> optionalAlbum = albumService.getAlbumById(albumId);

        if (optionalAlbum.isPresent()) {
            Album requestedAlbum = optionalAlbum.get();
            requestedAlbum.setLikes(updateLikeRequest.getLikes());
            requestedAlbum = albumService.updateAlbum(albumId, requestedAlbum);
            return ResponseEntity.ok(requestedAlbum);
        } else {
            // Handle the case when the album is not found
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable int id) {
        return albumService.getAlbumById(id).orElse(null);
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumService.saveAlbum(album);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable int id, @RequestBody Album album) throws ChangeSetPersister.NotFoundException {
        return albumService.updateAlbum(id, album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable int id) {
        albumService.deleteAlbum(id);
    }
}
