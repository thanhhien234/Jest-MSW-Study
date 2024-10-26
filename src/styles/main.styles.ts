import styled from "styled-components";

export const AppContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;


export const MainContainer = styled.section`
    display: flex;
    flex-direction: column;x
    align-items: center;
    gap: 20px;
    border: 1px solid black;
    width: 40%;
    height: 80%; 
    padding: 20px;
`;

export const Main= styled.article`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;