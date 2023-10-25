package com.acorn.melody2.controller;

import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserInfoController {

    @Autowired
    private UserAccountRepository userAccountRepository;

    //사용자 정보를 가저오는 엔드포인트
    @GetMapping("/userInfo")
    public ResponseEntity<UserAccount> getUserInfo(@RequestParam String accountId){
        // accountId를 이용하여 데이터베이스에서 사용자 정보를 조회
        UserAccount userAccount = userAccountRepository.findByAccountId(accountId);
        if(userAccount != null){
            // 사용자 정보가 존재하면 200 OK 응답과 사용자 정보를 반환
            return ResponseEntity.ok(userAccount);
        }else {
            // 사용자를 찾을 수 없을 때는 404 Not Found 응답을 반환
            return ResponseEntity.notFound().build();
        }
    }

    // 사용자의 탈퇴 상태를 가져오는 엔드포인트
    @GetMapping("/userWithdrawStatus")
    public ResponseEntity<Integer> getUserWithdrawStatus(@RequestParam String accountId) {
        // accountId를 이용하여 데이터베이스에서 사용자의 탈퇴 상태(IsWithdraw)를 조회
        UserAccount userAccount = userAccountRepository.findByAccountId(accountId);
        if (userAccount != null) {
            // 사용자 정보가 존재하면 200 OK 응답과 사용자의 탈퇴 상태(IsWithdraw)를 반환
            return ResponseEntity.ok(userAccount.getIsWithdraw());
        } else {
            // 사용자를 찾을 수 없을 때는 404 Not Found 응답을 반환
            return ResponseEntity.notFound().build();
        }
    }
}
