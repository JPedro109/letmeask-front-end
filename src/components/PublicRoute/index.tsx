import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from '../../providers/AuthProvider';

import { ContainerBigGif } from '../ContainerBigGif/index';
import { LoadingBigGif } from "../LoadingBigGif/index";

export const PublicRoute = () => {

  const { loading, authenticated } = useAuth();

  if (loading) {
    return <ContainerBigGif>
      <LoadingBigGif />
    </ContainerBigGif>;
  }

  if (authenticated) {
    return <Navigate to="/create-room" />
  }

  return <Outlet />
};