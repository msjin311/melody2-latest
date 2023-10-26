package com.acorn.melody2.repository;

import com.acorn.melody2.entity.Notice; // Notice로 수정
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
}