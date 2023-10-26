package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Comment_ID")
    private Long commentId;


    @Column(name = "Post_ID")
    private Long postId;

    @Column(name = "Comment_Content")
    private String commentContent;

    @Column(name = "Reply_Status")
    private boolean replyStatus;

}
