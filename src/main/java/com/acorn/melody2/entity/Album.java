package com.acorn.melody2.entity;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Album")
@Data
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Album_ID")
    private int albumId;

    @Column(name = "Album_Title", length = 100)
    private String albumTitle;

    @Column(name = "Cover_Photo", length = 200)
    private String coverPhoto;

    @Column(name = "Release_Date")
    private java.sql.Date releaseDate;

    @Column(name = "Album_Info", length = 500)
    private String albumInfo;

    @Column(name = "Rating", precision = 3)
    private double rating;

    @Column(name = "Reply_Count")
    private int replyCount;

    @Column(name = "Likes")
    private int likes;

    @Column(name = "Music_Video_Link", length = 200)
    private String musicVideoLink;

    @Column(name = "Album_Hashtags", length = 200)
    private String albumHashtags;

    @Column(name = "Solo_Artist_ID")
    private Integer soloArtistId;

    @Column(name = "Group_Artist_ID")
    private Integer groupArtistId;

    @ManyToOne
    @JoinColumn(name = "Solo_Artist_ID", referencedColumnName = "SoloArtist_ID", insertable = false, updatable = false)
    private SoloArtist soloArtist;

    @ManyToOne
    @JoinColumn(name = "Group_Artist_ID", referencedColumnName = "GroupArtist_ID", insertable = false, updatable = false)
    private GroupArtist groupArtist;

    //table과 연동 되지 않는 변수
    @Transient
    private String ArtistName = "";


    // Other album properties and relationships
}
