import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  LikedVideoProvider,
  PlayListProvider,
  ToastProvider,
  VideosProvider,
  WatchLaterProvider
} from "./context";
import { HistoryProvider } from "./context/historyContext";
export const ProviderWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <VideosProvider>
        <AuthProvider>
          <PlayListProvider>
            <WatchLaterProvider>
              <LikedVideoProvider>
                <HistoryProvider>
                  <BrowserRouter>{children}</BrowserRouter>
                </HistoryProvider>
              </LikedVideoProvider>
            </WatchLaterProvider>
          </PlayListProvider>
        </AuthProvider>
      </VideosProvider>
    </ToastProvider>
  );
};
