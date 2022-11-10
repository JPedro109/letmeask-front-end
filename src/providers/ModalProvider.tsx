import { createContext, ReactElement, useContext } from "react";
import { useModal as  hook } from "./hooks/useModal";
import { ReactProps } from "./types";

type Values = {
  display: boolean,
  handleShowModal: (modal: ReactElement) => void,
  handleCloseModal: (e: any) => void,
  children: ReactElement;
}

const ModalContext = createContext<Values>({} as Values);

export const ModalProvider = ({ children }: ReactProps) => {
  const { display, handleShowModal, handleCloseModal, ["children"]: reactChildren } = hook();

  return (
    <ModalContext.Provider value={{ display, handleShowModal, handleCloseModal, children: reactChildren }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);