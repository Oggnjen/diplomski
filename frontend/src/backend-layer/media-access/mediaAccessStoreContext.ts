import { emptyCallback } from '@/app/utils/constants';
import { createContext } from 'react';

export interface MediaConstraints {
  video: boolean | any;
  audio: boolean;
}

export interface MediaAccessStoreState {
  mediaStream: MediaStream | undefined;
  setMediaStream: (mediaStream: MediaStream) => void;
  constraints: MediaConstraints;
  setConstraints: (constraints: MediaConstraints) => void;
  videoTrack: MediaStreamTrack | undefined;
  setVideoTrack: (track: MediaStreamTrack) => void;
  audioTrack: MediaStreamTrack | undefined;
  setAudioTrack: (track: MediaStreamTrack) => void;
}

export function createMediaAccessStoreDefaultValue(): MediaAccessStoreState {
  return {
    mediaStream: undefined,
    setMediaStream: emptyCallback,
    constraints: {
      video: false,
      audio: false,
    },
    setConstraints: emptyCallback,
    videoTrack: undefined,
    audioTrack: undefined,
    setAudioTrack: emptyCallback,
    setVideoTrack: emptyCallback,
  };
}

export const MediaAccessStoreContext = createContext(createMediaAccessStoreDefaultValue());
