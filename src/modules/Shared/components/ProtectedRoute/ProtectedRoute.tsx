import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import {
    AuthContextProviderProps,
    AuthContextType
} from "../../../../interfaces/UserInfo/UserInfoResponse";

export default function ProtectedRoute({ children }: AuthContextProviderProps) {
  const { userData } = useContext(AuthContext) as AuthContextType;
  if (localStorage.getItem("userToken") || userData != null) return children;
  else return <Navigate to="/login" />;
}
