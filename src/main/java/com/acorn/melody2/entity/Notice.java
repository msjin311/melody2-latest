package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data //자동으로 게터,세터 equals, hashCode, toString 메서드를 구현
@NoArgsConstructor  // 매개변수 없는 기본 생성자를 자동으로 생성
@Entity
@Table(name = "Notice")
public class Notice {
    @Id  //기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Notice_ID")
    private Long noticeId;//

    @Column(name = "Admin_ID")
    private String adminId;

    @Column(name = "Notice_Title")
    private String noticeTitle;

    @Column(name = "Notice_Content")
    private String noticeContent;

    @Column(name = "Registration_Date")
    private Date registrationDate;


    // Other album properties and relationships
}
