import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { QuestionComponent } from '../../components/Question';
import { ContainerPage } from '../../components/ContainerPage';

import { Information } from "./Information";
import { QuestionContainer } from "./QuestionContainer";

import { api } from "../../services/api";

import { QuestionTypes } from "../../types";
import { notification } from '../../utils/notification';
import { LoadingBigGif } from '../../components/LoadingBigGif';
import { ContainerBigGif } from '../../components/ContainerBigGif';

export const Room = () => {
    const { code } = useParams();
    const [admin, setAdmin] = useState(false);
    const [roomName, setRoomName] = useState();
    const [questions, setQuestions] = useState([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const handleRoomName = async () => {
            if (mounted) {
                await api
                    .configApi
                    .get(`/room/${code}`, {
                    })
                    .then(({ data }) => {
                        setRoomName(data.response.name)
                        data.response === code ? setAdmin(true) : null
                    })
                    .catch(() => {
                        navigate("/create-room");
                        notification.error("Essa sala não pode ser acessada")
                    });
            }
        }

        const handleAdmin = async () => {
            await api
                .configApi
                .get(`/room-code`)
                .then(({ data }) => data.response === code ? setAdmin(true) : null)
                .catch(() =>
                    console.log("Erro no servidor")
                );
        };

        const fetchQuestions = async () => {
            if (mounted) {
                await api
                    .configApi
                    .get(`/question/${code}`)
                    .then(({ data }) => (setQuestions(data.response)))
                    .catch(() =>
                        console.log("Erro no servidor")
                    );
            }
        };

        if (initialLoading) {
            handleAdmin();
            handleRoomName();
            fetchQuestions();
            setTimeout(() => setInitialLoading(false), 600);
        }

        setTimeout(() => {
            handleRoomName();
            fetchQuestions();
        }, 500);

        return () => {
            mounted = false;
            return;
        }

    }, [questions, code, navigate, notification]);

    return (
        <>
            <Header admin={admin} />
            <ContainerPage>

                <h1>Sala {roomName}</h1>
                {!admin ? <QuestionContainer code={code} /> : null}

                {
                    initialLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                            <LoadingBigGif></LoadingBigGif>
                        </div>
                    ) : (
                        questions.length === 0 ? <Information admin={admin} />
                        : questions.map((question: QuestionTypes) => (
                            (
                                <QuestionComponent
                                    key={question.id}
                                    questionObject={question}
                                    admin={admin}
                                />
                            )
                        ))
                    )
                }

            </ContainerPage>
        </>
    );
}