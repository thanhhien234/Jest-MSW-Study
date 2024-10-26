import styled from "styled-components";

export const ToDoItemWrapper = styled.div<{ $isCompleted: boolean; }>`
    background-color: #fff;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration: ${({ $isCompleted }) => $isCompleted ? 'line-through' : 'none'};

    img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 5px;
    }
    
    span {
        flex: 1;
        margin: 0 10px;
    }
`;