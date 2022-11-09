import React from 'react';

import { LoadingBigGif } from "../LoadingBigGif/index";

import VerifyEmailTitleContainer from './style';

export const VerifyEmailTitle = () => {
    return ( 
        <>
            <main style={{ padding: ".9rem" }}>
                <VerifyEmailTitleContainer>
                    <div>
                        <h1>Verificando Email</h1>
                    </div>
                    <LoadingBigGif />
                </VerifyEmailTitleContainer>
            </main>
        </>
     );
}