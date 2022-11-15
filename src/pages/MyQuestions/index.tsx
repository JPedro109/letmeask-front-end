import { useState, useEffect } from 'react';

import { Header } from "../../components/Header";
import { QuestionComponent } from '../../components/Question';
import { ContainerPage } from '../../components/ContainerPage';
import { InformationContainer } from '../../components/InformationContainer';

import EmptyQuestions from "../../assets/images/empty-questions.svg";

import { api } from "../../services/api";

import { QuestionTypes } from "../../types";
import { notification } from '../../utils/notification';
import { LoadingBigGif } from '../../components/LoadingBigGif';

export const MyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            const fetchQuestions = async () => {
                await api
                    .configApi
                    .get(`/question`)
                    .then(({ data }) => (setQuestions(data.response)))
                    .catch(() => {
                        notification.error("Erro no servidor, as perguntas não podem ser apresentadas");
                    });
            };

            fetchQuestions();

            setTimeout(() => setInitialLoading(false), 500);
        }

        return () => {
            mounted = false;
            return;
        }
    }, [questions, notification]);

    return (
        <>
            <Header />
            <ContainerPage>

                {
                    initialLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                            <LoadingBigGif></LoadingBigGif>
                        </div>
                    ) : (
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
                    )
                }

            </ContainerPage>
        </>
    );
}