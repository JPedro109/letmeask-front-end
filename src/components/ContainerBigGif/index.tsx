import { ReactElement } from 'react';

import ContainerBigGifStyle from './styles';

type ContainerBigGifTypes = {
    children: ReactElement;
}

export const ContainerBigGif = ({ children }: ContainerBigGifTypes) => {
    return <ContainerBigGifStyle> { children } </ContainerBigGifStyle>
}