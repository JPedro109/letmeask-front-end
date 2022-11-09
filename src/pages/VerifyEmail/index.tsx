import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { VerifyEmailTitle } from "../../components/VerifyEmailTitle";

import { api } from "../../services/api";
import { notification } from "../../utils/notification";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [calledPush, setCalledPush] = useState(true);

  useEffect(() => {
    if(calledPush) {
      setCalledPush(false);
      const handleVerifyEmail = async () => {
        await api
          .configApi
          .post(`/verify-email${search}`)
          .then(() => notification.success("E-mail verificado com sucesso"))
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor")
          );
      };
      handleVerifyEmail();
      navigate("/");
    }
  }, [navigate, calledPush, search]);

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}