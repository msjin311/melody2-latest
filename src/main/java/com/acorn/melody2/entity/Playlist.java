package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Playlist")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Playlist_ID")
    private int playlistId;

    @Column(name = "UserAccount_ID")
    private int userAccountId;

    @Column(name = "Playlist_Name", length = 100)
    private String playlistName;

    @Column(name = "Description", length = 500)
    private String description;

    @Column(name = "Created_Date")
    private java.sql.Date createdDate;

    @Column(name = "Playlist_Hashtags", length = 200)
    private String playlistHashtags;

    @ManyToOne
    @JoinColumn(name = "UserAccount_ID", referencedColumnName = "UserAccount_ID", insertable = false, updatable = false)
    private UserAccount userAccount;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SongPlaylist> songPlaylists;

}
