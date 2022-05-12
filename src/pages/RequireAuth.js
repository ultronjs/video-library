import { Navigate } from "react-router";
import { useAuth } from "../context";

export const RequireAuth = ({ children }) => {
  const { signInStatus } = useAuth();
  return signInStatus.status ? children : <Navigate to="/login" replace />;
};
