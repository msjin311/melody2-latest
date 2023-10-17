package com.acorn.melody2.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String accountId;
    private String password;
}
