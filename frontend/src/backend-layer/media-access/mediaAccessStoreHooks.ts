import { useContext } from 'react';
import { MediaAccessStoreContext, MediaConstraints } from './mediaAccessStoreContext';

export const useCreateMediaStream = () => {
  const context = useContext(MediaAccessStoreContext);
  return async (constraints: MediaConstraints) => {
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        context.setVideoTrack(videoTrack);
        context.setAudioTrack(audioTrack);
        context.setMediaStream(stream);
        context.setConstraints(constraints);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });
  };
};

export function useAddScreenShare() {
  const { setMediaStream, mediaStream, setVideoTrack } = useContext(MediaAccessStoreContext);

  return async () => {
    const screenCaptureStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'browser',
      },
    });

    const recentVideoTrack = mediaStream?.getVideoTracks()[0];
    if (recentVideoTrack) {
      mediaStream?.removeTrack(recentVideoTrack);
      mediaStream.addTrack(screenCaptureStream.getVideoTracks()[0]);
      setMediaStream(mediaStream);
    }
    setVideoTrack(screenCaptureStream.getVideoTracks()[0]);
    return screenCaptureStream;
  };
}

export const useMediaStream = (): [MediaStream | undefined, (mediaStream: MediaStream) => void] => {
  const context = useContext(MediaAccessStoreContext);
  return [context.mediaStream, context.setMediaStream];
};

export const useIsCameraOn = () => {
  const context = useContext(MediaAccessStoreContext);
  return context.mediaStream;
};

export function useStopCamera() {
  const { mediaStream, setMediaStream } = useContext(MediaAccessStoreContext);
  return () => {
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = false;
      setMediaStream(mediaStream);
    }
  };
}

export function useStartCamera() {
  const { mediaStream, setMediaStream } = useContext(MediaAccessStoreContext);
  return () => {
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = true;
      setMediaStream(mediaStream);
    }
  };
}

export function useStopMic() {
  const { mediaStream, setMediaStream } = useContext(MediaAccessStoreContext);
  return () => {
    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = false;
      setMediaStream(mediaStream);
    }
  };
}

export function useStartMic() {
  const { mediaStream, setMediaStream } = useContext(MediaAccessStoreContext);
  return () => {
    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = true;
      setMediaStream(mediaStream);
    }
  };
}

export function useIsMicOn() {
  const { mediaStream } = useContext(MediaAccessStoreContext);
  if (mediaStream && mediaStream.getAudioTracks()[0] != undefined) {
    return mediaStream.getAudioTracks()[0].enabled;
  }
  return false;
}

export function useIsCamOn() {
  const { mediaStream } = useContext(MediaAccessStoreContext);
  if (mediaStream) {
    return mediaStream.getVideoTracks()[0].enabled;
  }
  return false;
}

export function useMicTrack() {
  const { mediaStream } = useContext(MediaAccessStoreContext);
  if (mediaStream) {
    return mediaStream.getVideoTracks()[0];
  }
  return undefined;
}

export function useVideoTrack() {
  const { videoTrack } = useContext(MediaAccessStoreContext);
  if (videoTrack) {
    return videoTrack;
  }
  return undefined;
}
