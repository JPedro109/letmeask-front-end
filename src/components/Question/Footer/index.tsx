import { MdOutlineDelete, MdOutlineQuestionAnswer } from "react-icons/md";

import FooterStyle from './styles';

import { api } from "../../../services/api";

import { useModal } from "../../../providers/ModalProvider";

import { QuestionTypes } from "../../../types/index";
import { DeleteQuestionModal } from '../DeleteQuestionModal';

type FooterTypes = {
    question: QuestionTypes;
    admin: boolean | undefined;
    handleShowResponseField: () => void;
}

export const Footer = ({ question, admin, handleShowResponseField }: FooterTypes) => {
    const { response, id, name } = question;
    const { handleShowModal } = useModal();
    const handleDeleteQuestion = async () => handleShowModal(<DeleteQuestionModal id={id} />);

    return (
        <FooterStyle>
            <div>
                <strong>
                    {name}
                </strong>
            </div>
            <div>
                {
                    admin && !response
                        ? (
                            <>
                                <MdOutlineQuestionAnswer onClick={() => handleShowResponseField()} />
                                <MdOutlineDelete onClick={() => handleDeleteQuestion()} />
                            </>
                        )
                        : <MdOutlineDelete onClick={() => handleDeleteQuestion()} />
                }
            </div>
        </FooterStyle>
    );
}