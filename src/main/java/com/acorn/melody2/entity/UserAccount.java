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
@NoArgsConstructor
@Entity
@Table(name = "UserAccount")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserAccount_ID")
    private Long userAccountId;

    private String name;

    @Column(name = "Birth_Date")
    private Date birthDate;

    @Column(name = "Age_Group")
    private String ageGroup;

    @Column(name = "Account_ID", unique = true)
    private String accountId;

    @Column(name = "PassWord")
    private String password;

    private String email;

    private String gender;

    @Column(name = "Profile_Image", columnDefinition = "VARCHAR(100) DEFAULT 'default_profile_image.jpg'")
    private String profileImage;

    @Column(name = "User_Hashtags")
    private String userHashtags;

    @Column(name = "IsWithdraw")
    //데이터베이스 컬럼 이름 지정
    private int isWithdraw;
    //사용자 탈퇴여부



}
