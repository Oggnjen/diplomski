package com.jolly.rendS.call;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CallIdentifierGenerator {

    public String generate() {
        return UUID.randomUUID().toString();
    }
}
