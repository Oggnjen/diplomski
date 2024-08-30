export const BASE_URL = "https://jolly.bounceme.net/api";

export const WS_URL = "wss://jolly.bounceme.net/api/ws";

export const emptyCallback = () => {};

export const rtcServers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com",
    },
    {
      urls: "turn:89.40.8.248:3478",
      username: "_",
      credential: "_",
    },
    // {
    //   urls: 'turn:openrelay.metered.ca:443',
    //   username: 'openrelayproject',
    //   credential: 'openrelayproject',
    // },
    // {
    //   urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    //   username: 'openrelayproject',
    //   credential: 'openrelayproject',
    // },
  ],
};

export const HIDDEN_MEMBERS_LIMIT = 2;
