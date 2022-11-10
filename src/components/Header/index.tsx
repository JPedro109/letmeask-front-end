import { useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";

import { DeleteRoomModal } from './DeleteRoomModal';

import { HeaderContainer, NavigationContainer, LogoContainer, HeaderButton, CodeRoomCopy, IconMenu } from "./styles";

import Logo from "../../assets/images/logo.svg";
import Copy from "../../assets/images/copy.svg";

import { useModal } from '../../providers/ModalProvider';
import { useAuth } from '../../providers/AuthProvider';

type HeaderTypes = {
    admin?: boolean
}

export const Header = ({ admin }: HeaderTypes) => {
    const { handleLogout } = useAuth();
    const { code } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleLink = (link: string) => navigate(link);
    const copyRoomCodeToClipboard = () => navigator.clipboard.writeText(code || "Erro");
    const [left, setLeft] = useState(`${-1000}px`);
    const [icon, setIcon] = useState(<AiOutlineMenu onClick={() => handleShowMenu()} />);
    const { handleShowModal, handleCloseModal, display } = useModal();
    const handleShowMenu = () => {
        setIcon(<AiOutlineCloseCircle onClick={() => {
            handleCloseMenu();
        }} />);
        setLeft("0");
    };
    const handleCloseMenu = () => {
        setIcon(<AiOutlineMenu onClick={() => handleShowMenu()} />);
        setLeft(`${-1000}px`);
    }
    const handleRemoveRoom = async () => {
        handleShowModal(<DeleteRoomModal code={code!} />);
        handleCloseMenu();
    }

    return (
        <>
            <HeaderContainer>
                <LogoContainer>
                    <img src={Logo} alt="Logo da Aplicação" />
                </LogoContainer>
                <IconMenu>
                    {icon}
                </IconMenu>
                <NavigationContainer left={left}>
                    <ul>
                        {
                            pathname !== "/my-questions" ?
                                (<li>
                                    <CodeRoomCopy onClick={() => copyRoomCodeToClipboard()}>
                                        <span>
                                            <img src={Copy} alt="Símbolo de Cópia e Colar" />
                                        </span>
                                        <span>
                                            <strong>Sala {code}</strong>
                                        </span>
                                    </CodeRoomCopy>
                                </li>) : null
                        }

                        {
                            admin && pathname !== "/my-questions" ?
                                (
                                    <li>
                                        <HeaderButton onClick={() => handleRemoveRoom()}>
                                            Encerrar Sala
                                        </HeaderButton>
                                    </li>
                                ) :
                                (
                                    <li>
                                        <HeaderButton onClick={() => history.back()}>
                                            Voltar
                                        </HeaderButton>
                                    </li>
                                )
                        }
                        <li>
                            <HeaderButton onClick={() => handleLink("/my-questions")}>
                                Minhas Perguntas
                            </HeaderButton>
                        </li>
                        <li>
                            <HeaderButton onClick={() => { handleLink("/update-email"); }}>
                                Configurações do Usuário
                            </HeaderButton>
                        </li>
                        <li>
                            <HeaderButton onClick={() => handleLogout()}>
                                Sair
                            </HeaderButton>
                        </li>
                    </ul>
                </NavigationContainer>
            </HeaderContainer>
        </>
    );
}