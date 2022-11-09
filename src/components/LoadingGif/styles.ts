import styled from "styled-components";

const LoadigGifStyle = styled.div`
    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    margin: 0 auto;
    border: 3px solid #000;
    border-radius: 50%;
    border-top-color: rgba(0,0,0,0.2);
    height: 16px;
    width: 16px;
    animation: loading 2s linear infinite;
`;

export default LoadigGifStyle;