import { ReactElement, useState } from 'react';

import { ContainerMain } from "../../components/ContainerMain";
import { Logo } from "../../components/Logo";
import { FormInput } from "../../components/FormInput";
import { FormLink } from "../../components/FormLink";
import { FormButton } from "../../components/FormButton";
import { LoadingGif } from '../../components/LoadingGif';

import { Form } from "../../styles/form";

import { useAuth } from "../../providers/AuthProvider";

import { notification } from '../../utils/notification';
import { validation } from '../../utils/validation';
import { storage } from '../../utils/storage';

import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { setAuthenticated } = useAuth();
    const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Login");
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {

        e.preventDefault();
    
        const { email, password } = e.target;
    
        if (!email.value || !password.value) return notification.error("Preencha todos os campos");
    
        if (!validation.isEmailValid(email.value)) return notification.error("Email/Senha Incorreto(s)");
        
        if (!validation.isPasswordValid(password.value)) return notification.error("Email/Senha Incorreto(s)");
    
        setButtonChildren(<LoadingGif />);
    
        await api.configApi
          .post("/user/login", {
            email: email.value,
            password: password.value,
          })
          .then(({ data }) => {
            setFormValues({});
    
            const token = data.response.accessToken;

            // storage.addAuthStorage(token); TODO - uncomment after create create room page
            // api.addTokenInAuthorizationHeader(token); TODO - uncomment after create create room page

            // setAuthenticated(true); TODO - uncomment after create create room page
          })
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor, tente novamente mais tarde")
          );
    
        setButtonChildren("Login");
    };

    return ( 
        <>
            <ContainerMain>
                <Form onSubmit={handleLogin}>
                    <Logo />
                    
                    <h2>Login</h2>

                    <FormInput 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
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

                    <FormButton type="submit">
                        {buttonChildren}
                    </FormButton>

                    <FormLink link="/register">Ainda não tem um cadastro?</FormLink>
                    <FormLink link="/forget-password">Esqueceu sua senha?</FormLink>
                </Form>
            </ContainerMain>
        </>
    );
}