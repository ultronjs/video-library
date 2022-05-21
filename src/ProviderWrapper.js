import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  LikedVideoProvider,
  PlayListProvider,
  ToastProvider,
  WatchLaterProvider
} from "./context";
export const ProviderWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlayListProvider>
          <WatchLaterProvider>
            <LikedVideoProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </LikedVideoProvider>
          </WatchLaterProvider>
        </PlayListProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
