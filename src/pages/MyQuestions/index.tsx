import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from "../../components/Header";
import { QuestionComponent } from '../../components/Question';
import { ContainerPage } from '../../components/ContainerPage';
import { InformationContainer } from '../../components/InformationContainer';

import EmptyQuestions from "../../assets/images/empty-questions.svg";

import { api } from "../../services/api";

import { QuestionTypes } from "../../types";
import { notification } from '../../utils/notification';

export const MyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
    
        if(mounted) {
            const fetchQuestions = async () => {
                await api
                  .configApi
                  .get(`/question`)
                  .then(({ data }) => (setQuestions(data.response)))
                  .catch(() => {
                      notification.error("Erro no servidor, as perguntas não podem ser apresentadas");
                      navigate("/create-room");
                  });
              };

            fetchQuestions();

        }
        
        return () => {
            mounted = false;
            return;
        }
    }, [questions, notification, navigate]);

    return ( 
        <>
            <Header />
            <ContainerPage>

                {
                    questions.length === 0 ? (
                        <InformationContainer>
                            <img src={EmptyQuestions} alt="Imagem representando balões de pergunta" />
                            <h2>Nenhuma pergunta por aqui</h2>
                            <span>
                                Entre em uma sala e comece a perguntar!
                            </span>
                        </InformationContainer>
                    ) :

                    questions.map((question: QuestionTypes) => (
                        (
                            <QuestionComponent 
                                key={question.id} 
                                questionObject={question} 
                            />
                        )
                    ))
                }

            </ContainerPage>
        </>
     );
}