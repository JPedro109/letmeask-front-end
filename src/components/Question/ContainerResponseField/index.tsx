import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ContainerResponseFieldStyle, ButtonResponse, ButtonCancel } from './styles';

import { api } from "../../../services/api";

import { QuestionTypes } from "../../../types/index";
import { notification } from '../../../utils/notification';

type ContainerResponseFieldTypes = {
    question: QuestionTypes;
    display: string;
    handleCloseResponseField: () => void;
}

export const ContainerResponseField = ({ question, display, handleCloseResponseField }: ContainerResponseFieldTypes) => {
    const { id } = question;
    const { code } = useParams();
    const [newResponse, setNewReponse] = useState("");
    const handleResponse = async (e: any) => {
        e.preventDefault();

        if(!newResponse) return notification.error("Preencha o campo de resposta");

        await api
          .configApi
          .post(`/response/${code}/${id}`, {
              response: newResponse
          })
            .catch(({ response }) =>
                response
                    ? notification.error(response.data.message)
                    : notification.error("Erro no Servidor")
        );

        handleCloseResponseField();
    }

    return (
        <ContainerResponseFieldStyle display={display}>
            <form onSubmit={handleResponse}>
                <textarea 
                    placeholder="Digite sua resposta"
                    value={newResponse}
                    onChange={event => setNewReponse(event.target.value)}
                ></textarea>
                <div>
                    <ButtonCancel type="button" onClick={() => handleCloseResponseField()}>
                        Cancelar
                    </ButtonCancel>
                    <ButtonResponse type="submit">
                        Responder
                    </ButtonResponse>
                </div>
            </form>
        </ContainerResponseFieldStyle>
    );
}