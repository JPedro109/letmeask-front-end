import { useState, useEffect, ReactElement } from 'react';
import { useNavigate } from "react-router-dom";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import { Link } from "../../components/Link";
import { LoadingGif } from "../../components/LoadingGif/index";

import { Form } from "../../styles/form";

import { useAuth } from "../../providers/AuthProvider";

import { api } from "../../services/api";
import { notification } from '../../utils/notification';

export const CreateRoom = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Criar Sala");
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const handleCreateRoom = async (e: any) => {

    e.preventDefault();

    let { roomName } = e.target;

    if (!roomName.value) return notification.error("Preencha todos os campos");

    setButtonChildren(<LoadingGif />);

    await api
      .configApi
      .post(`/room`, {
        name: roomName.value,
      })
      .then(({ data }) => {
        setFormValues({});
        navigate(`/room/${data.response.code}`);
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor, tente novamente")
      );

    setButtonChildren("Criar Sala");
  };

  useEffect(() => {
    let mounted = true;

    const handleShowRoom = async () => {
      if (mounted) {
        await api
          .configApi
          .get(`/room-code`)
          .then(({ data }) => {
            if (data.response) navigate(`/room/${data.response}`);
          })
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor, sua sala não pode ser acessada")
          );
      }
    };

    handleShowRoom();

    return () => {
      mounted = false;
      return;
    }
  });

  return (
    <>
      <ContainerMain>
        <Form onSubmit={handleCreateRoom}>
          <Logo />

          <h2>Criar sala</h2>

          <FormInput
            type="text"
            name="roomName"
            placeholder="Nome da Sala"
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <FormButton type="submit">
            {buttonChildren}
          </FormButton>

          <Link link={"/enter-room"}>
            Quer entrar em uma sala já existente?
          </Link>

          <Link link={"/my-questions"}>
            Quer acessar suas perguntas?
          </Link>

          <Link link={"/update-email"}>
            Quer acessar configurações do usuário?
          </Link>

          <Link onClick={() => handleLogout()}>
            Quer sair de sua sessão?
          </Link>

        </Form>
      </ContainerMain>
    </>
  );
}