import { ReactNode, useState } from 'react';
import { MediaAccessStoreContext, MediaAccessStoreState, MediaConstraints } from './mediaAccessStoreContext';

export function MediaAccessStoreProvider({ children }: { children?: ReactNode }) {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>();
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack>();
  const [constraints, setConstraints] = useState<MediaConstraints>({
    audio: false,
    video: false,
  });
  const value: MediaAccessStoreState = {
    mediaStream: mediaStream,
    setMediaStream: setMediaStream,
    constraints: constraints,
    setConstraints: setConstraints,
    videoTrack,
    audioTrack,
    setAudioTrack,
    setVideoTrack,
  };
  return <MediaAccessStoreContext.Provider value={value}>{children}</MediaAccessStoreContext.Provider>;
}

export function withMediaAccessStoreProvider<P extends object>(Component: React.ComponentType<P>) {
  const withMediaAccessStoreProvider = (props: P) => (
    <MediaAccessStoreProvider>
      <Component {...props} />
    </MediaAccessStoreProvider>
  );
  return withMediaAccessStoreProvider;
}
