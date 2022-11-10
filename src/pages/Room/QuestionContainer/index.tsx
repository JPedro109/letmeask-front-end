import { ReactElement, useState } from 'react';

import { QuestionContainerStyle, Button } from "./styles";

import { LoadingGif } from '../../../components/LoadingGif';

import { api } from "../../../services/api";
import { notification } from '../../../utils/notification';

type QuestionContainerType = {
    code: string | undefined;
}

export const QuestionContainer = ({ code }: QuestionContainerType) => {

    const [buttonChildren, setButtonChidren] = useState<string | ReactElement>("Enviar Pergunta");
    const [question, setQuestion] = useState("");
    const handleCreateQuestion = async (e: any) => {
        e.preventDefault();
        
        if(!question) return notification.error("Preencha o campo de questão");
    
        setButtonChidren(<LoadingGif />);
    
        await api
            .configApi
            .post(`/question/${code}`, {
                question: question
            })
            .catch(({ response }) =>
                response
                  ? notification.error(response.data.message)
                  : notification.error("Erro no Servidor")
            );
    
        setQuestion("");
        setButtonChidren("Enviar Pergunta");
    
    }

    return (
        <QuestionContainerStyle>
            <form onSubmit={handleCreateQuestion}>
                <textarea 
                    placeholder="O que você quer perguntar?" 
                    value={question}
                    onChange={event => setQuestion(event.target.value)}
                ></textarea>
                <div>
                    <Button type="submit">{buttonChildren}</Button>
                </div>
            </form>
        </QuestionContainerStyle>
    );
}