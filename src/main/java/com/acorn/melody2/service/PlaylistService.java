package com.acorn.melody2.service;

import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.Song;
import com.acorn.melody2.entity.SongPlaylist;
import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.repository.PlaylistRepository;
import com.acorn.melody2.repository.SongPlaylistRepository;
import com.acorn.melody2.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.OpMultiply;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, SongRepository songRepository) {
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Optional<Playlist> getPlaylistById(int id) {
        return playlistRepository.findById(id);
    }

    public List<Playlist> getPlaylistsByuserAccountId(Long id) {
        return playlistRepository.findByuserAccountId(id);
    }

    public Playlist savePlaylist(Playlist playlist){ return playlistRepository.save(playlist);}

    public Playlist getSongsByPlaylistId(Long playlistId) {
        Playlist playlist = playlistRepository.findById(Math.toIntExact(playlistId)).orElse(null);

        if (playlist != null) {
            List<SongPlaylist> songPlaylists = playlist.getSongPlaylists();
            List<Song> songs = new ArrayList<>();

            for (SongPlaylist songPlaylist : songPlaylists) {
                // Retrieve the Song object by its ID and add it to the songs list
                Song song = songRepository.findById(songPlaylist.getSongId()).orElse(null);
                if (song != null) {
                    songs.add(song);
                }
            }

            playlist.setSongs(songs);
        }

        return playlist;
    }


    public Playlist updatePlaylist(Long id, Playlist updatedPlaylist) {
        Optional<Playlist> existingPlaylist = playlistRepository.findById(Math.toIntExact(id));
        if (existingPlaylist.isPresent()) {
            Playlist playlistToUpdate = existingPlaylist.get();
            playlistToUpdate.setPlaylistId(id);
            playlistToUpdate.setPlaylistName(updatedPlaylist.getPlaylistName());
            playlistToUpdate.setDescription(updatedPlaylist.getDescription());
            playlistToUpdate.setPlaylistHashtags(updatedPlaylist.getPlaylistHashtags());
            return playlistRepository.save(playlistToUpdate);
        } else {
            return null;
        }

    }

    public void deletePlaylist(int id) {
        playlistRepository.deleteById(id);
    }
}
