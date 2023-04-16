import { ReactElement, useState } from "react";

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { FormLink } from "../../components/FormLink";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from "../../components/LoadingGif";

import { Form } from "../../styles/form";

import { api } from "../../services/api";

import { validation } from "../../utils/validation";
import { notification } from "../../utils/notification";
import { invalid } from "../../utils/messages";

export const Register = () => {
    const [formValues, setFormValues] = useState({});
    const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Cadastrar");

    const handleRegister = async (e: any) => {
      e.preventDefault();

      const { email, name, password, passwordConfirm } = e.target;
  
      if (!email.value || !name.value || !password.value || !passwordConfirm.value) return notification.error("Preencha todos os campos");
  
      if (!validation.isEmailValid(email.value)) return notification.error(invalid.email);
  
      if (!validation.isPasswordValid(password.value)) return notification.error(invalid.password);
  
      if (password.value !== passwordConfirm.value) return notification.error("As senhas não coincidem");
  
      setButtonChildren(<LoadingGif />);
  
      await api
        .configApi
        .post("/users", {
          email: email.value,
          username: name.value,
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        })
        .then(() => {
          setFormValues({});
          notification.success("Usuário cadastrado com sucesso, verique seu email, não esqueça de verificar sua caixa de spam");
        })
        .catch(({ response }) =>
          response
            ? notification.error(response.data.message)
            : notification.error("Erro no Servidor, tente novamente mais tarde")
        );
  
      setButtonChildren("Cadastrar");
    };

    return ( 
        <>
            <ContainerMain>
              <Form onSubmit={handleRegister}>
                    <Logo />

                    <h2>Cadastrar</h2>
                    
                    <FormInput 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                    <FormInput 
                      type="text" 
                      name="name" 
                      placeholder="Nome" 
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                    <FormInput 
                      type="password" 
                      name="password"
                      placeholder="Senha" 
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                    <FormInput
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirmação de Senha"
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />

                    <FormButton type="submit">
                        {buttonChildren}
                    </FormButton>

                    <FormLink link="/">Já tem um cadastro?</FormLink>
                </Form>
            </ContainerMain>
        </>
    );
}