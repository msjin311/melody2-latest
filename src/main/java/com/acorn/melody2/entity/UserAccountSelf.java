package com.acorn.melody2.entity;
// 패키지 선언

import jakarta.persistence.*;
// JPA 어노테이션 import
import lombok.Data;
// Lombok Data 어노테이션 import
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CollectionId;
// Lombok NoArgsConstructor 어노테이션 import

import java.sql.Date;

@Data
// Lombok Data 어노테이션: Getter, Setter, ToString 등의 메서드를 자동 생성
@NoArgsConstructor
// Lombok NoArgsConstructor 어노테이션: 기본 생성자 생성
@Entity
// JPA 엔터티 클래스임을 나타내는 어노테이션
@Table(name = "UserAccount")
// 데이터베이스 테이블 이름 지정
public class UserAccountSelf {
    @Id
    // 주요 식별키(primary key) 필드임을 나타내는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 자동 생성되는 식별키로 설정 (자동 증가)
    @Column(name = "UserAccount_ID")
    // 데이터베이스 컬럼 이름 지정
    private Long UserAccount_ID;
    // 사용자 계정의 고유 식별자

    @Column(name = "Account_ID", unique = true)
    // 데이터베이스 컬럼 이름 지정 및 고유한 값(unique)으로 설정
    private String Account_ID;
    // 사용자 계정 ID

    @Column(name = "PassWord")
    // 데이터베이스 컬럼 이름 지정
    private String PassWord;
    // 사용자 비밀번호
    
    @Column(name = "Name")
    //데이터베이스 컬럼 이름 지정
    private String Name;
    //사용자 이름

    @Column(name = "BirthDate")
    //데이터베리스 컬럼 이름 지정
    private Date BirthDate;
    //사용자 생일

    @Column(name = "AgeGroup")
    //데이터베이스 컬럼 이름 지정
    private String AgeGroup;
    //사용자 연령대별 그룹

    @Column(name = "Email")
    //데이터베이스 컬럼 이름 지정
    private String Email;
    //사용자 이메일

    @Column(name = "Gender")
    //데이터베이스 컬럼 이름 지정
    private String Gender;
    //사용자 성별
}