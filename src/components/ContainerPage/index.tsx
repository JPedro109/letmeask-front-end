import ContainerPageStyle from "./styles";

type ContainerPageTypes = {
    children: any;
}

export const ContainerPage = ({ children }: ContainerPageTypes) => {
    return ( 
        <>
            <ContainerPageStyle>
                { children }
            </ContainerPageStyle>
        </>
     );
}