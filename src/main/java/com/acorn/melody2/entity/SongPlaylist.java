package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
@Entity
@Table(name = "SongPlaylist")
@Data
@IdClass(SongPlaylist.SongPlaylistId.class)
public class SongPlaylist {

    @Id
    @Column(name = "Playlist_ID")
    private int playlistId;

    @Id
    @Column(name = "Song_ID")
    private int songId;

    @ManyToOne
    @JoinColumn(name = "Playlist_ID", referencedColumnName = "Playlist_ID", insertable = false, updatable = false)
    private Playlist playlist;

    @ManyToOne
    @JoinColumn(name = "Song_ID", referencedColumnName = "Song_ID", insertable = false, updatable = false)
    private Song song;

    // You can add additional properties if needed

    public void setSongPlaylistId(SongPlaylistId songPlaylistId) {
        this.playlistId = songPlaylistId.getPlaylistId();
        this.songId = songPlaylistId.getSongId();
    }

    @Data
    public static class SongPlaylistId implements Serializable {
        private int playlistId;
        private int songId;

        // Add a no-argument constructor
        public SongPlaylistId() {
        }

        public SongPlaylistId(int playlistId, int songId) {
            this.playlistId = playlistId;
            this.songId = songId;
        }
    }
}

