package com.acorn.melody2.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Genre")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Genre_ID")
    private Long genreId;

    @Column(name = "Genre_Name")
    private String genreName;

    // Getter and setter methods
}
