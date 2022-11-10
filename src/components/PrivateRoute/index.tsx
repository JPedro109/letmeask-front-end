import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from '../../providers/AuthProvider';
import { notification } from '../../utils/notification';

import { ContainerBigGif } from '../ContainerBigGif';
import { LoadingBigGif } from "../LoadingBigGif";

export const PrivateRoute = () => {

  const { loading, authenticated, expirySession, handleLogout } = useAuth();

  if (loading) {
    return <ContainerBigGif>
      <LoadingBigGif />
    </ContainerBigGif>;
  }

  if (expirySession) {
    handleLogout();
    notification.error("Sessão Expirada");
    return <Navigate to="/" />
  }

  if (!authenticated) {
    return <Navigate to="/" />
  }

  return <Outlet />
};