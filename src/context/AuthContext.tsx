import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  AuthContextProviderProps,
  AuthContextType,
  UserData,
} from "../interfaces/UserInfo/UserInfoResponse";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveUserData = () => {
    const enCodedToken: any = localStorage.getItem("userToken");
    const deCodedToken: UserData = jwtDecode<UserData>(enCodedToken);
    setUserData(deCodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") || userData != null) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
