import { ReactElement, useState } from "react";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { Link } from "../../components/Link";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif/index";

import { Form } from "../../styles/form";

import { api } from "../../services/api";
import { notification } from "../../utils/notification";

export const UpdateName = () => {
    const [formValues, setFormValues] = useState({});
    const [buttonChidren, setButtonChildren] = useState<string | ReactElement>("Atualizar Nome");

    const handleUpdateName = async (e: any) => {
        e.preventDefault();

        const { name } = e.target;
    
        if (!name.value) return notification.error("Preencha o campo de nome");
    
          setButtonChildren(<LoadingGif />);
    
        await api
          .configApi
          .patch("/update-name", {
            name: name.value,
          })
          .then(() => {
            setFormValues({})
            notification.success("Nome atualizado com sucesso");
          })
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor, tente novamente mais tarde")
          );
    
        setButtonChildren("Atualizar Nome");
      };

    return ( 
        <>
            <ContainerMain>
              <Form onSubmit={handleUpdateName}>
                    <Logo />
                    
                    <h2>Atualizar Nome</h2>

                    <FormInput type="text" name="name" placeholder="Nome" formValues={formValues} setFormValues={setFormValues} />

                    <FormButton type="submit">
                        {buttonChidren}
                    </FormButton>

                    <Link link="/update-email">Quer atualizar seu email?</Link>
                    <Link link="/update-password">Quer atualizar sua senha?</Link>
                    <Link link="/delete-user">Quer excluir sua conta?</Link>
                    <Link link="/create-room">Quer voltar à página inicial?</Link>
                </Form>
            </ContainerMain>
        </>
     );
}