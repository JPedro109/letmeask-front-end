import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

import {
    ModalStyle,
    ContainerButton,
    ButtonDelete,
    ButtonCancel,
    MessageModal
} from "../../../styles/modal";

import { api } from "../../../services/api";

import { notification } from "../../../utils/notification";

type RoomModalTypes = {
    code: string;
}

export const DeleteRoomModal = ({ code }: RoomModalTypes) => {
    const navigate = useNavigate();
    const handleRemoveRoom = async () => {
        await api
            .configApi
            .delete(`/rooms/${code}`)
            .then(() => {
                notification.success("Sala deletada com sucesso");
                navigate("/create-room");
            })
            .catch(({ response }) =>
                response
                    ? notification.error(response.data.message)
                    : notification.error("Erro no Servidor")
            );
    }

    return (
        <>
            <ModalStyle id="modal">
                <TiDeleteOutline />
                <MessageModal id="message">Encerrar Sala</MessageModal>
                <div>
                    <span>Tem certeza que você deseja encerrar esta sala?</span>
                </div>
                <ContainerButton>
                    <ButtonCancel>Cancelar</ButtonCancel>
                    <ButtonDelete onClick={handleRemoveRoom}>Sim, encerrar</ButtonDelete>
                </ContainerButton>
            </ModalStyle>
        </>
    );
}