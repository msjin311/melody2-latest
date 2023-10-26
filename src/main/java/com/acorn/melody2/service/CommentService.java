package com.acorn.melody2.service;

import com.acorn.melody2.entity.Comment;
import com.acorn.melody2.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        // 필요한 경우 유효성 검사 또는 비즈니스 로직 추가 가능
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, Comment updatedComment) {
        // 필요한 경우 유효성 검사 또는 비즈니스 로직 추가 가능
        updatedComment.setCommentId(id);
        return commentRepository.save(updatedComment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
