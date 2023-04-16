import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import { VerifyEmailTitle } from "../../components/VerifyEmailTitle/index";

import { api } from "../../services/api";

import { notification } from "../../utils/notification";

export const VerifyEmailUpdate = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
      const handleVerifyEmailUpdate = async () => {
        await api
          .configApi
          .patch(`/users/email${search}`)
          .then(({ data }) => notification.success("E-mail atualizado com sucesso"))
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor")
          );
      };
  
      handleVerifyEmailUpdate();
      navigate("/");
    });

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}