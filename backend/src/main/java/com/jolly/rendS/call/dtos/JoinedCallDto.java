package com.jolly.rendS.call.dtos;


import java.util.List;

public record JoinedCallDto(String callId, String myId,String myName,String mySurname, String myEmail, List<MemberDto> members) {
}
