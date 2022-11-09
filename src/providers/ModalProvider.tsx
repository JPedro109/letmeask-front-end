import { createContext, ReactElement, useContext } from "react";
import { useModal as  hook } from "./hooks/useModal";
import { ReactProps } from "./types";

type Values = {
  display: boolean,
  handleShowModal: (modal: ReactElement) => void,
  handleCloseModal: (e: any) => void,
}

const ModalContext = createContext<Values>({} as Values);

export const ModalProvider = ({ children }: ReactProps) => {
  const { display, handleShowModal, handleCloseModal } = hook();

  return (
    <ModalContext.Provider value={{ display, handleShowModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);