package com.acorn.melody2.service;

import com.acorn.melody2.controller.SongController;
import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.Song;
import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.utils.PlaylistUtil;
import com.acorn.melody2.repository.SongRepository;
import com.acorn.melody2.repository.PlaylistRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final PlaylistRepository playlistRepository;
    private final EntityManager entityManager; // Inject the EntityManager

    private static final Logger logger = LoggerFactory.getLogger(SongService.class);

    @Autowired
    public SongService(SongRepository songRepository, PlaylistRepository playlistRepository, EntityManager entityManager) {
        this.songRepository = songRepository;
        this.playlistRepository = playlistRepository; // Initialize playlistRepository
        this.entityManager = entityManager;
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Optional<Song> getSongById(int id) {
        return songRepository.findById(id);
    }

    public Song saveSong(Song song) {
        return songRepository.save(song);
    }

    public Song updateSong(int id, Song updatedSong) {
        // Check if the song with the given ID exists
        if (!songRepository.existsById(id)) {
            throw new EntityNotFoundException("Song with ID " + id + " not found");
        }

        // Set the ID of the updated song to match the existing song
        updatedSong.setSongId(id);

        // Save the updated song
        return songRepository.save(updatedSong);
    }

    public void deleteSong(int id) {
        songRepository.deleteById(id);
    }

    // Search for songs by title
    public List<Song> searchSongsByTitle(String title) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Song> criteriaQuery = criteriaBuilder.createQuery(Song.class);
        Root<Song> root = criteriaQuery.from(Song.class);

        // Create a predicate to filter songs by title
        Predicate titlePredicate = criteriaBuilder.like(
                criteriaBuilder.lower(root.get("title")),
                "%" + title.toLowerCase() + "%"
        );

        criteriaQuery.where(titlePredicate);

        TypedQuery<Song> query = entityManager.createQuery(criteriaQuery);
        logger.warn("title : " + title);
        logger.warn(query.getResultList().toString());
        return query.getResultList();
    }

    public void addSongToPlaylist(int songId, int playlistId) {
        Optional<Song> songOptional = songRepository.findById(songId);
        Optional<Playlist> playlistOptional = playlistRepository.findById(playlistId);

        if (songOptional.isPresent() && playlistOptional.isPresent()) {
            Song song = songOptional.get();
            Playlist playlist = playlistOptional.get();

            // Check if the song is not already in the playlist
            if (!PlaylistUtil.getSongsInPlaylist(playlist).contains(song)) {
                PlaylistUtil.addSongToPlaylist(playlist, song);
                playlistRepository.save(playlist);
            }
        }
    }

    public void removeSongFromPlaylist(int songId, int playlistId) {
        Optional<Song> songOptional = songRepository.findById(songId);
        Optional<Playlist> playlistOptional = playlistRepository.findById(playlistId);

        if (songOptional.isPresent() && playlistOptional.isPresent()) {
            Song song = songOptional.get();
            Playlist playlist = playlistOptional.get();

            // Check if the song is in the playlist
            if (PlaylistUtil.getSongsInPlaylist(playlist).contains(song)) {
                PlaylistUtil.removeSongFromPlaylist(playlist, song);
                playlistRepository.save(playlist);
            }
        }
    }
}
