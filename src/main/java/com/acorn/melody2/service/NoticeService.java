package com.acorn.melody2.service;

import com.acorn.melody2.entity.Notice; // Notice로 수정
import com.acorn.melody2.repository.NoticeRepository; // BoardRepository에서 NoticeRepository로 수정
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<Notice> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public Notice updateNotice(Long id, Notice updatedNotice) {
        updatedNotice.setNoticeId(id);
        return noticeRepository.save(updatedNotice);
    }

    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}