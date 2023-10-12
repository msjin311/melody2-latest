package com.acorn.melody2.entity;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "GroupArtists")
@Data
public class GroupArtist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GroupArtist_ID")
    private int groupArtistId;

    @Column(name = "Group_Name", length = 100)
    private String groupName;

    @Column(name = "Group_Photo", length = 200)
    private String groupPhoto;

    @Column(name = "Group_Info", length = 500)
    private String groupInfo;

    @Column(name = "Group_Hashtags", length = 200)
    private String groupHashtags;
}
