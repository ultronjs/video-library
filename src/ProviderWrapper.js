import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  ToastProvider,
} from "./context";
export const ProviderWrapper = ({ children }) => {
  return (
    <ToastProvider>
        <AuthProvider>
              <BrowserRouter>
              {children}
              </BrowserRouter>
        </AuthProvider>
    </ToastProvider>
  );
};
