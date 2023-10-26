package com.acorn.melody2.entity;
// 패키지 선언

import jakarta.persistence.*;
// JPA 어노테이션 import
import lombok.Builder;
import lombok.Data;
// Lombok Data 어노테이션 import
import lombok.NoArgsConstructor;
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
public class UserAccount {
    @Id
    // 주요 식별키(primary key) 필드임을 나타내는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 자동 생성되는 식별키로 설정 (자동 증가)
    @Column(name = "UserAccount_ID")
    // 데이터베이스 컬럼 이름 지정
    private Long userAccountId;
    // 사용자 계정의 고유 식별자

    private String name;
    //사용자 이름

    @Column(name = "Birth_Date")
    //데이터베리스 컬럼 이름 지정
    private Date birthDate;
    //사용자 생년월일

    @Column(name = "Age_Group")
    //데이터베이스 컬럼 이름 지정
    private String ageGroup;
    //사용자 연령대별 그룹

    @Column(name = "Account_ID", unique = true)
    // 데이터베이스 컬럼 이름 지정 및 고유한 값(unique)으로 설정
    private String accountId;
    // 사용자 계정 ID

    @Column(name = "PassWord")
    // 데이터베이스 컬럼 이름 지정
    private String password;
    // 사용자 비밀번호

    private String email;
    //사용자 이메일

    private String gender;
    //사용자 성별

    @Column(name = "Profile_Image", columnDefinition = "VARCHAR(100) DEFAULT 'default_profile_image.jpg'")
    // 데이터베이스 컬럼 이름 지정 'default_profile_image.jpg'파일을 기본으로지정
    private String profileImage;
    //사용자 프로필이미지

    @Column(name = "User_Hashtags")
    //데이터베이스 컬럼 이름 지정
    private String userHashtags;
    //사용자 해시태그

    @Column(name = "IsWithdraw")
    //데이터베이스 컬럼 이름 지정
    private int isWithdraw;
    //사용자 탈퇴여부

//    @Column(name = "Prefer_Genre_ID")
//    private Long preferGenreId;

//    @ManyToOne
//    @JoinColumn(name = "Prefer_Genre_ID", referencedColumnName = "Genre_ID", insertable = false, updatable = false)
//    private Genre preferGenre;


}
