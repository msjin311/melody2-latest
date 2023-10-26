package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Board")
public class Board {
    @Id  //기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Board_ID")
    private Long boardId;//

    @Column(name = "Account_ID", unique = true)
    private String accountId;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @Column(name = "Creation_Date")
    private Date creationDate;






    // Other album properties and relationships
}
