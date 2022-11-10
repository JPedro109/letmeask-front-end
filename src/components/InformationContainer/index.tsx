import { ReactElement } from 'react';

import InformationContainerStyle from "./styles";

type InformationContainerTypes = {
    children: ReactElement[];
}

export const InformationContainer = ({ children }: InformationContainerTypes) => {
    return ( 
        <>
            <InformationContainerStyle>
                { children }
            </InformationContainerStyle>
        </>
     );
}