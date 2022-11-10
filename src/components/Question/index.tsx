import { useState } from 'react';

import { ContainerQuestion, ContentQuestion, ContainerResponse } from './styles';

import { QuestionTypes } from "../../types/index";

import { Footer } from "./Footer";
import { ContainerResponseField } from "./ContainerResponseField";
import { Modal } from '../Modal';

import { useModal } from '../../providers/ModalProvider';

type QuestionComponentTypes = {
    questionObject: QuestionTypes;
    admin?: boolean | undefined;
}

export const QuestionComponent = ({ questionObject, admin }: QuestionComponentTypes) => {
    const { question, response, id } = questionObject;
    const [displayResponse, setDisplayResponse] = useState("none");
    const handleShowResponseField = () => setDisplayResponse("block");
    const handleCloseResponseField = () => setDisplayResponse("none");

    return (
        <>
            <ContainerQuestion>
                <ContentQuestion>
                    {question}
                </ContentQuestion>
                <Footer
                    question={questionObject}
                    admin={admin}
                    handleShowResponseField={handleShowResponseField}
                />
                {
                    response ? (
                        <ContainerResponse>
                            {response}
                        </ContainerResponse>
                    ) : null
                }
                <ContainerResponseField
                    question={questionObject}
                    display={displayResponse}
                    handleCloseResponseField={handleCloseResponseField}
                />
            </ContainerQuestion>
        </>
    );
}