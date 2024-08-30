package com.jolly.rendS.call;

import com.jolly.rendS.call.dtos.CreatedCallDto;
import com.jolly.rendS.call.dtos.JoinedCallDto;

public interface CallService {
    CreatedCallDto initiateCall();
    JoinedCallDto joinCall(String callId);
    void exitCall(String callId);
}
