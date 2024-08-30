package com.jolly.rendS.sdp.dtos;

import com.jolly.rendS.call.dtos.MemberDto;

public record SdpDto(MemberDto memberDto,
                     String sdp,
                     String destination,
                     String requestType) {
}
