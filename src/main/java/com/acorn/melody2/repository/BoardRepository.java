package com.acorn.melody2.repository;

import com.acorn.melody2.entity.Album;
import com.acorn.melody2.entity.Board;
import com.acorn.melody2.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

}
