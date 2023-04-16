import { ReactElement, useState } from "react";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { Link } from "../../components/Link";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif";

import { Form } from "../../styles/form";

import { api } from "../../services/api";

import { useAuth } from "../../providers/AuthProvider";

import { notification } from "../../utils/notification";
import { validation } from "../../utils/validation";
import { invalid } from "../../utils/messages";

export const DeleteUser = () => {
    const { handleLogout } = useAuth();
    const [formValues, setFormValues] = useState({});
    const [buttonChidren, setButtonChildren] = useState<string | ReactElement>("Excluir Usuário");

    const handleDeleteUser = async (e: any) => {
      e.preventDefault();

      const { password, passwordConfirm } = e.target;
  
      if (!password.value || !passwordConfirm.value) return notification.error("Preencha todos os campos");
  
      if (!validation.isPasswordValid(password.value)) return notification.error(invalid.password);
  
      if (password.value !== passwordConfirm.value) return notification.error("As senhas não coincidem");
  
        setButtonChildren(<LoadingGif />);
    
        await api
        .configApi
          .delete(`/users`, {
            data: {
              password: password.value,
              passwordConfirm: passwordConfirm.value,
            },
          })
          .then(() => {
            setFormValues({});
            handleLogout();
            notification.success("Usuário deletado com sucesso");
          })
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor, tente novamente mais tarde")
          );
    
        setButtonChildren("Excluir Usuário");
    };

    return ( 
        <>
            <ContainerMain>
              <Form onSubmit={handleDeleteUser}>
                    <Logo />
                    
                    <h2>Excluir Usuário</h2>

                    <FormInput 
                        type="password" 
                        placeholder="Senha" 
                        name="password" 
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />

                    <FormInput
                        type="password"
                        placeholder="Confirmação de Senha"
                        name="passwordConfirm"
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />

                    <FormButton type="submit">
                        {buttonChidren} 
                    </FormButton>

                    <Link link="/update-email">Quer atualizar seu email?</Link>
                    <Link link="/update-name">Quer atualizar seu nome?</Link>
                    <Link link="/update-password">Quer atualizar sua senha?</Link>
                    <Link link="/create-room">Quer voltar à página inicial?</Link>
                </Form>
            </ContainerMain>
        </>
     );
}