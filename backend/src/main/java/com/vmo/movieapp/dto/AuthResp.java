package com.vmo.movieapp.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResp {
    private String accessToken;
    private UserDTO user;
}
