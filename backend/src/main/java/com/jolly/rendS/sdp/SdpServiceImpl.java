package com.jolly.rendS.sdp;

import com.jolly.rendS.sdp.dtos.SdpPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SdpServiceImpl implements SdpService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void provideSdp(SdpPayload sdp, String destination) {
        simpMessagingTemplate.convertAndSendToUser(destination, "/queue/private", sdp);
    }
}
