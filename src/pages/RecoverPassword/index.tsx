import { ReactElement, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif/index";

import { Form } from "../../styles/form";

import { api } from "../../services/api";
import { validation } from "../../utils/validation";
import { notification } from "../../utils/notification";
import { invalid } from "../../utils/messages";

export const RecoverPassword = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const handleLink = (link: string) => navigate(link);
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Atualizar Senha");

  const handleRecoverPassword = async (e: any) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value) return notification.error("Preencha todos os campos");

    if (!validation.isPasswordValid(password.value)) return notification.error(invalid.password);

    setButtonChildren(<LoadingGif />);

    await api
      .configApi
      .patch(`/users/password-recover${search}`, {
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("Senha atualizada com sucesso");
        handleLink("/");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor, tente novamente mais tarde")
      );

    setButtonChildren("Atualizar Senha");
  };

    return ( 
        <>
            <ContainerMain>
                <Form onSubmit={handleRecoverPassword}>
                    <Logo />
                    
                    <h2>Recuperação de Senha</h2>

                    <FormInput
                        type="password"
                        placeholder="Nova Senha"
                        name="password"
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />

                    <FormInput
                        type="password"
                        placeholder="Confirmação de Nova Senha"
                        name="passwordConfirm"
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />

                    <FormButton type="submit">
                        {buttonChildren}
                    </FormButton>

                </Form>
            </ContainerMain>
        </>
    );
}