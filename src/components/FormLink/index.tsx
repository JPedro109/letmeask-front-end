import { useNavigate } from 'react-router-dom';

import FormLinkStyle from './styles';

type FormLinkTypes = {
    link: string,
    children: string
}

export const FormLink = ( { link, children }: FormLinkTypes ) => {
    const navigate = useNavigate();

    return ( 
        <>
            <div>
                <FormLinkStyle onClick={() => navigate(link)}>
                    { children }
                </FormLinkStyle>
            </div>
        </>
     );
}