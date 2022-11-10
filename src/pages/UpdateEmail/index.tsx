import { ReactElement, useState } from "react";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { Link } from "../../components/Link";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif/index";

import { Form } from "../../styles/form";

import { api } from "../../services/api";
import { validation } from "../../utils/validation";
import { notification } from "../../utils/notification";

export const UpdateEmail = () => {
    const [formValues, setFormValues] = useState({});
    const [buttonChidren, setButtonChildren] = useState<string | ReactElement>("Atualizar Email");

    const handleUpdateEmail = async (e: any) => {
        e.preventDefault();

        const { email } = e.target;
    
        if (!email.value) return notification.error("Preencha o campo de email");
    
        if (!validation.isEmailValid(email.value)) return notification.error("Coloque um email válido");
    
        setButtonChildren(<LoadingGif />);
    
        await api
          .configApi
          .post("/user/email/send-token-update-email", {
            email: email.value,
          })
          .then(() => {
            setFormValues({})
            notification.success("E-mail atualizado com sucesso");
          })
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor, tente novamente mais tarde")
          );
    
        setButtonChildren("Atualizar Email");
    };

    return ( 
        <>
            <ContainerMain>
              <Form onSubmit={handleUpdateEmail}>
                    <Logo />
                    
                    <h2>Atualizar Email</h2>

                    <FormInput 
                      type="email" 
                      name="email" 
                      placeholder="Email"  
                      formValues={formValues} 
                      setFormValues={setFormValues}  
                    />

                    <FormButton type="submit">
                        {buttonChidren}
                    </FormButton>

                    <Link link="/update-name">Quer atualizar seu nome?</Link>
                    <Link link="/update-password">Quer atualizar sua senha?</Link>
                    <Link link="/delete-user">Quer excluir sua conta?</Link>
                    <Link link="/create-room">Quer voltar à página inicial?</Link>
                </Form>
            </ContainerMain>
        </>
     );
}