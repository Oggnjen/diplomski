package com.jolly.rendS.sdp;

import com.jolly.rendS.sdp.dtos.SdpPayload;

public interface SdpService {
    void provideSdp(SdpPayload sdp, String destination);
}
