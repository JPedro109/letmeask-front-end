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

export const Room = () => {
    const { code } = useParams();
    const [admin, setAdmin] = useState<boolean | null>(null);
    const [roomName, setRoomName] = useState();
    const [questions, setQuestions] = useState([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const handleRoom = async () => {
            if (mounted) {
                await api
                    .configApi
                    .get(`/rooms/${code}`, {
                    })
                    .then(({ data }) => {                  
                        console.log(data);
                        setRoomName(data.name);
                        setQuestions(data.questions);
                    })
                    .catch(() => {
                        navigate("/create-room");
                        notification.error("Essa sala não pode ser acessada")
                    });
            }
        }

        const handleAdmin = async () => {
            if (mounted && admin == null) {
                await api
                    .configApi
                    .get(`/rooms/managed-room`, {
                    })
                    .then(({ data }) => {
                        data === code ? setAdmin(true) : setAdmin(false);
                    })
                    .catch(() => {
                        notification.error("Essa sala não pode ser acessada");
                    });
            }
        }

        handleAdmin();
        handleRoom();

        setTimeout(() => {
            setInitialLoading(false);
        }, 1000);

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
                                    admin={admin as boolean}
                                />
                            )
                        ))
                    )
                }

            </ContainerPage>
        </>
    );
}