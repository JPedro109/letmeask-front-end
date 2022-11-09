import { useState } from "react";

export const useModal = () => {
  const [display, setDisplay] = useState<boolean>(false);

  const handleShowModal = () => {
    setDisplay(true);
  }

  const handleCloseModal = (e: any) => {
    setDisplay(false);
  }

  return { display, handleShowModal, handleCloseModal }
}