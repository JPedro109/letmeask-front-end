import { createContext, useContext } from "react";
import { ReactProps } from './types';
import { useAuth as hook } from "./hooks/useAuth";

type Values = {
  handleLogout: () => void,
  authenticated: boolean,
  loading: boolean,
  expirySession: boolean,
  setExpirySession: (value: boolean) => void,
  setAuthenticated: (value: boolean) => void,
}

const AuthContext = createContext<Values>({} as Values);

export const AuthProvider = ({ children }: ReactProps) => {

  const {
    handleLogout, 
    authenticated, 
    loading,
    expirySession, 
    setExpirySession, 
    setAuthenticated
  } = hook();

  return (
    <AuthContext.Provider
      value={{
        handleLogout, 
        expirySession, 
        setExpirySession, 
        setAuthenticated,
        loading,
        authenticated, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);