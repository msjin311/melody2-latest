package com.acorn.melody2.controller;

import com.acorn.melody2.entity.Notice; // Notice로 수정
import com.acorn.melody2.service.NoticeService; // NoticeService로 수정
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-notices") // user-boards에서 user-notices로 수정
public class NoticeController {
    private final NoticeService noticeService; // NoticeService로 수정
    private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

    @Autowired
    public NoticeController(NoticeService noticeService) { // NoticeService로 수정
        this.noticeService = noticeService; // NoticeService로 수정
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() { // Notice로 수정
        List<Notice> notices = noticeService.getAllNotices(); // Notice로 수정
        return ResponseEntity.ok(notices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeByNo(@PathVariable Long id) { // Notice로 수정
        Optional<Notice> notice = noticeService.getNoticeById(id); // Notice로 수정
        return notice.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) { // Notice로 수정
        logger.warn(notice.toString());
        Notice createdNotice = noticeService.createNotice(notice); // Notice로 수정
        return new ResponseEntity<>(createdNotice, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Long id, @RequestBody Notice updatedNotice) { // Notice로 수정
        logger.warn(updatedNotice.toString());
        Notice updated = noticeService.updateNotice(id, updatedNotice); // Notice로 수정
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) { // Notice로 수정
        noticeService.deleteNotice(id); // Notice로 수정
        return ResponseEntity.noContent().build();
    }
}