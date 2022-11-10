import { ReactElement } from "react";
import { ModalContainer } from "../../styles/modal";
import ReactDOM from "react-dom";

import { useModal } from "../../providers/ModalProvider";

export const Modal = () => {
    const { children, handleCloseModal, display } = useModal();
    if (!display) return null;   

    return ReactDOM.createPortal(
        <ModalContainer onClick={handleCloseModal}>
            {children}
        </ModalContainer>
        , document.body
    );
}