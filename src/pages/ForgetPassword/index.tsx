import { ReactElement, useState } from "react";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { FormLink } from "../../components/FormLink";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif/index";

import { Form } from "../../styles/form";

import { api } from "../../services/api";
import { validation } from "../../utils/validation";
import { notification } from "../../utils/notification";

export const ForgetPassword = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Enviar Email");

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    
    const { email } = e.target;

    if (!email.value) return notification.error("Preencha o campo de email");

    if (!validation.isEmailValid(email.value)) return notification.error("Coloque um email válido");

    setButtonChildren(<LoadingGif />);

    await api
      .configApi
      .post("/users/send-password-recovery-link", {
        email: email.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("O link de recuperação de senha foi enviado para seu email, ele é válido por alguns minutos, não esqueça de verificar sua caixa de spam");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildren("Enviar Email");
  };

    return ( 
        <>
            <ContainerMain>
                <Form onSubmit={handleForgetPassword}>
                    <Logo />

                    <h2>Esqueci minha senha</h2>
                    
                    <FormInput 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      formValues={formValues} 
                      setFormValues={setFormValues} 
                    />

                    <FormButton type="submit">
                        {buttonChildren}
                    </FormButton>

                    <FormLink link="/">Lembrou sua senha?</FormLink>
                </Form>
            </ContainerMain>
        </>
    );
}