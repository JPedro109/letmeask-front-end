import { useState, useEffect } from "react";

import { storage } from "../../utils/storage";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [expirySession, setExpirySession] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false);
    api.cleanAuthorizationHeader();
    storage.removeAuthStorage();
    navigate("/");
  };

  useEffect(() => {
    const { token, tokenExpiryTime } = storage.getAuthStorage();

    if(token) Date.now() < parseInt(tokenExpiryTime || "0") ? setAuthenticated(true) : handleLogout();
  
    setLoading(false);
  },[]);

  return { 
    handleLogout, 
    authenticated, 
    loading,
    expirySession, 
    setExpirySession, 
    setAuthenticated
  };
};