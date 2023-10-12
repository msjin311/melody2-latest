package com.acorn.melody2.entity;
import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "SoloArtists")
@Data
public class SoloArtist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SoloArtist_ID")
    private int soloArtistId;

    @Column(name = "Singer_Name", length = 100)
    private String singerName;

    @Column(name = "Singer_Photo", length = 200)
    private String singerPhoto;

    @Column(name = "Singer_Info", length = 500)
    private String singerInfo;

    @Column(name = "Singer_Hashtags", length = 200)
    private String singerHashtags;
}
