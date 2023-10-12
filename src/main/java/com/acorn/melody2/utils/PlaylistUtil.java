package com.acorn.melody2.utils;

import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.Song;
import com.acorn.melody2.entity.SongPlaylist;

import java.util.ArrayList;
import java.util.List;

public class PlaylistUtil {

    public static List<Song> getSongsInPlaylist(Playlist playlist) {
        List<Song> songs = new ArrayList<>();

        for (SongPlaylist songPlaylist : playlist.getSongPlaylists()) {
            songs.add(songPlaylist.getSong());
        }

        return songs;
    }

    public static void addSongToPlaylist(Playlist playlist, Song song) {
        // Create a new SongPlaylist entity to represent the relationship
        SongPlaylist songPlaylist = new SongPlaylist();
        songPlaylist.setPlaylist(playlist);
        songPlaylist.setSong(song);

        // Add the SongPlaylist entity to the playlist's songPlaylists collection
        playlist.getSongPlaylists().add(songPlaylist);
    }

    public static void removeSongFromPlaylist(Playlist playlist, Song song) {
        // Iterate through song playlists to find the one with the matching song
        SongPlaylist songPlaylistToRemove = null;
        for (SongPlaylist songPlaylist : playlist.getSongPlaylists()) {
            if (songPlaylist.getSong().equals(song)) {
                songPlaylistToRemove = songPlaylist;
                break;
            }
        }

        // If a matching song playlist is found, remove it from the playlist
        if (songPlaylistToRemove != null) {
            playlist.getSongPlaylists().remove(songPlaylistToRemove);
        }
    }
}
