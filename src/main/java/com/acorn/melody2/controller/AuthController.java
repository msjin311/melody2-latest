package com.acorn.melody2.controller;

import com.acorn.melody2.dto.LoginRequest;
import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.service.AuthService;
import com.acorn.melody2.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private UserAccountService userAccountService;
    private AuthService authService;

    @Autowired
    public AuthController(UserAccountService userAccountService, AuthService authService) {
        this.userAccountService = userAccountService;
        this.authService = authService;
    }



    @PostMapping("/login")
    public ResponseEntity<UserAccount> login(@RequestBody LoginRequest loginRequest) {
        // Implement your login logic here, e.g., validate credentials
        // You can use userAccountService to retrieve user data and validate credentials

        // If login is successful, return user data
        UserAccount user = authService.loginTest(loginRequest);
        //but before ill j
        if (user != null) {
            return ResponseEntity.ok(user);
        }

        // If login fails, return an error response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}