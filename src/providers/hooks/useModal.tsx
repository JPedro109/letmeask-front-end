import { ReactElement, useState } from "react";

export const useModal = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [children, setChildren] = useState<ReactElement>(<div></div>);

  const handleShowModal = (children: ReactElement) => {
    setChildren(children);
    setDisplay(true);
  }

  const handleCloseModal = (e: any) => {
    setDisplay(false);
    setChildren(<div></div>);
  }

  return { display, handleShowModal, handleCloseModal, children }
}