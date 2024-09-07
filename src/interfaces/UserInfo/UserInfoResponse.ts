import { ReactNode } from "react";

export interface UserData {
  userName: string;
  userEmail: string;
  userGroup: string;
}

export interface AuthContextType {
  userData: UserData | null;
  saveUserData: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

