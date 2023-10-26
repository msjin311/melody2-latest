package com.acorn.melody2.service;

import com.acorn.melody2.dto.LoginRequest;
import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.exception.CustomAuthenticationException;
import com.acorn.melody2.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.Objects;

@Service
public class AuthService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    public UserAccount loginTest(LoginRequest loginRequest) {
        // Extract account ID and password from loginRequest
        String accountId = loginRequest.getAccountId();
        String password = loginRequest.getPassword();

        // Verify credentials (you should handle exceptions here)
        UserAccount userAccount = userAccountRepository.findByAccountId(accountId);
        if (userAccount != null && isValidPassword(userAccount.getPassword(), password)) {
            return userAccount;
        } else {
            // Handle authentication failure
            throw new CustomAuthenticationException("Authentication failed: Invalid credentials");
        }
    }

//    private String generateJwtToken(UserAccount user) {
//        // Generate JWT token using user details
//        // You can use libraries like jjwt to create tokens
//        // ...
//    }


    // Check if the provided password matches the stored hashed password
    private boolean isValidPassword(String hashedPassword, String providedPassword) {
        // Implement your password hashing and comparison logic here
        // For simplicity, let's assume plain text password matching
        return StringUtils.hasText(hashedPassword) && hashedPassword.equals(providedPassword);
    }


}
