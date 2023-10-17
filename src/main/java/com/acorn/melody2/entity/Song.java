package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Song")
@Data
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Song_ID")
    private int songId;

    @Column(name = "Album_ID")
    private int albumId;

    @Column(name = "Title", length = 100)
    private String title;

    @Column(name = "Song_Info", length = 500)
    private String songInfo;

    @Column(name = "Lyrics", length = 2000)
    private String lyrics;

    @Column(name = "Duration")
    private int duration;

    @Column(name = "Likes")
    private int likes;

    @Column(name = "Playlist_Count")
    private int playlistCount;

    @Column(name = "Artist_Type")
    private String artistType;

    @Column(name = "Artist_ID")
    private int artistId;

    @Column(name = "Song_Hashtags", length = 200)
    private String songHashtags;

    @Column(name = "URL", length = 200)
    private String url;

    @Column(name = "Genre_ID")
    private int genreId;

    @ManyToOne
    @JoinColumn(name = "Album_ID", referencedColumnName = "Album_ID", insertable = false, updatable = false)
    private Album album;

    @ManyToOne
    @JoinColumn(name = "Artist_ID", referencedColumnName = "SoloArtist_ID", insertable = false, updatable = false)
    private SoloArtist soloArtist;

    @ManyToOne
    @JoinColumn(name = "Artist_ID", referencedColumnName = "GroupArtist_ID", insertable = false, updatable = false)
    private GroupArtist groupArtist;

    @ManyToOne
    @JoinColumn(name = "Genre_ID", referencedColumnName = "Genre_ID", insertable = false, updatable = false)
    private Genre genre;

    @Transient
    private Object artist; // Transient field for storing the artist dynamically

    public Object getArtist() {
        if (this.artistType.equals("solo")) {
            return this.soloArtist;
        } else if (this.artistType.equals("Group")) {
            return this.groupArtist;
        } else {
            return null;
        }
    }
}
