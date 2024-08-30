package com.jolly.rendS.sdp.dtos;

import com.jolly.rendS.call.dtos.MemberDto;

public record SdpPayload(MemberDto memberDto, String sdp, String requestType) {
}
