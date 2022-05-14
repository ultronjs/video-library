import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  LikedVideoProvider,
  ToastProvider,
  WatchLaterProvider
} from "./context";
export const ProviderWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <WatchLaterProvider>
          <LikedVideoProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </LikedVideoProvider>
        </WatchLaterProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
