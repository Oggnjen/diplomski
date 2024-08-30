package com.jolly.rendS.sdp;

import com.jolly.rendS.sdp.dtos.SdpDto;
import com.jolly.rendS.sdp.dtos.SdpPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sdp")
public class SdpController {

    private final SdpService sdpService;

    @PostMapping
    public void provideSdp(@RequestBody SdpDto sdpDto) {
        sdpService.provideSdp(new SdpPayload(sdpDto.memberDto(),sdpDto.sdp(), sdpDto.requestType()), sdpDto.destination());
    }
}
