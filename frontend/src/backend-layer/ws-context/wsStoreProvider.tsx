import { ReactNode, useEffect, useState } from 'react';
import { WsStoreContext, WsStoreState } from './wsStoreContext';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { WS_URL } from '@/app/utils/constants';

export function WsStoreProvider({ children }: { children?: ReactNode }) {
  const [stompClient, setStompClient] = useState<CompatClient | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  let value: WsStoreState = {
    stomp: stompClient,
    isOpen: isConnected,
  };
  useEffect(() => {
    const stomp = Stomp.over(function () {
      return new WebSocket(`${WS_URL}`);
    });
    stomp.connect(
      {},
      () => {
        setStompClient(stomp);
        setIsConnected(true);
      },
      () => {
        console.error('Error connecting to Stomp server:');
      }
    );
    stomp.debug = function () {};
    return () => {
      stomp.deactivate();
    };
  }, []);

  return <WsStoreContext.Provider value={value}>{children}</WsStoreContext.Provider>;
}

export function withWsStoreProvider<P extends object>(Component: React.ComponentType<P>) {
  const withWsStoreProvider = (props: P) => (
    <WsStoreProvider>
      <Component {...props} />
    </WsStoreProvider>
  );
  return withWsStoreProvider;
}
