import { MdOutlineDelete } from "react-icons/md";

import {
  ModalStyle,
  ContainerButton,
  ButtonDelete,
  ButtonCancel,
  MessageModal,
  ModalContainer
} from "../../../styles/modal";

import { api } from "../../../services/api";

import { notification } from "../../../utils/notification";

type QuestionModalTypes = {
  id: string;
}

export const DeleteQuestionModal = ({ id }: QuestionModalTypes) => {

  const handleQuestionDelete = async () => {
    await api
      .configApi
      .delete(`/question/${id}`)
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );
  }

  return (
    <>
      <ModalContainer>
        <ModalStyle id="modal">
          <MdOutlineDelete />
          <MessageModal id="message">Excluir pergunta</MessageModal>
          <div>
            <span>Tem certeza que você deseja excluir essa pergunta?</span>
          </div>
          <ContainerButton>
            <ButtonCancel>Cancelar</ButtonCancel>
            <ButtonDelete onClick={() => handleQuestionDelete()}>Sim, excluir</ButtonDelete>
          </ContainerButton>
        </ModalStyle>
      </ModalContainer>
    </>
  );
}