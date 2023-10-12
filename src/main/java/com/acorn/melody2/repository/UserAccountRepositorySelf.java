package com.acorn.melody2.repository;
// 패키지 선언

import com.acorn.melody2.entity.UserAccountSelf;
// UserAccount 엔터티 클래스 임포트
import org.springframework.data.jpa.repository.JpaRepository;
// Spring Data JPA 라이브러리에서 제공하는 JpaRepository 임포트
import org.springframework.stereotype.Repository;
// 스프링 빈으로 등록하기 위한 Repository 어노테이션 임포트

@Repository
// 스프링 빈으로 등록되는 Repository 클래스임을 나타내는 어노테이션
public interface UserAccountRepositorySelf extends JpaRepository<UserAccountSelf, Long> {
    // Spring Data JPA에서 JpaRepository를 상속하여 제공되는 기본적인 CRUD(Create, Read, Update, Delete) 메서드를 상속받아 사용할 수 있게해줌
    // 또한 사용자 정의 쿼리 메서드를 추가할 수 있음
}