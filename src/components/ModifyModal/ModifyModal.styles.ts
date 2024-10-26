import styled from 'styled-components';

export const ModalContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

export const ModalMain = styled.section`
    width: 40%;
    height: 20%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 20px 30px;

    & h2 {
        font-size: 16px;
        padding: 0;
        margin: 0;
        text-align: left;
        font-weight: 500;
    }
`;

export const ModalButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;

`;
export const ModalButton = styled.button<{ $btnText: string;}>`
    background-color: ${props => props.$btnText === 'cancel' ? 'f1f1f1' : 'gray'};
    color : ${props => props.$btnText === 'cancel' ? 'black' : 'white'};
    border-radius: 10px;
    cursor: pointer;
    margin: 10px;
    border: 1px solid black;
    width: 100px;
    padding: 7px;
`;