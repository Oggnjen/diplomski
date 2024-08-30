import type { AppProps } from 'next/app';
import '../app/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '@/backend-layer/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MediaAccessStoreProvider } from '@/backend-layer/media-access/mediaAccessStoreProvider';
import { WsStoreProvider } from '@/backend-layer/ws-context/wsStoreProvider';
import { ChatStoreProvider } from '@/backend-layer/chat-context/chatStoreProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <Provider store={store}>
      <MediaAccessStoreProvider>
        <WsStoreProvider>
          <ToastContainer />
          <ChatStoreProvider>
            <Component {...pageProps} />
          </ChatStoreProvider>
        </WsStoreProvider>
      </MediaAccessStoreProvider>
    </Provider>
  );
}
