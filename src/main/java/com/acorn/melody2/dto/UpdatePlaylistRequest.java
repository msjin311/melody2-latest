package com.acorn.melody2.dto;

import com.acorn.melody2.entity.Playlist;
import com.acorn.melody2.entity.UserAccount;
import lombok.Data;

@Data
public class UpdatePlaylistRequest {
    private Playlist playlist;
    private UserAccount userAccount;
}
