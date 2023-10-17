package com.acorn.melody2.dto;

import lombok.Data;

@Data
public class UpdateLikeRequest {
    private int likes;
    private int albumId;
}
