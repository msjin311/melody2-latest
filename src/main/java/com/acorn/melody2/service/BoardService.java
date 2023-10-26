package com.acorn.melody2.service;

import com.acorn.melody2.entity.Board;
import com.acorn.melody2.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Optional<Board> getBoardById(Long id) {
        return boardRepository.findById(id);
    }

    public Board createBoard(Board board) {
        // 필요한 경우 유효성 검사 또는 비즈니스 로직 추가 가능
        return boardRepository.save(board);
    }

    public Board updateBoard(Long id, Board updatedBoard) {
        // 필요한 경우 유효성 검사 또는 비즈니스 로직 추가 가능
        updatedBoard.setBoardId(id);
        return boardRepository.save(updatedBoard);
    }

    public void deleteBoard(Long no) {
        boardRepository.deleteById(no);
    }


}