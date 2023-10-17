package com.acorn.melody2.repository;


import com.acorn.melody2.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    // You can add custom query methods here if needed
    UserAccount findByAccountId(String accountId);

}
