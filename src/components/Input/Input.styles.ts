import styled from 'styled-components';

export const InputContainer = styled.main`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 10px;
  width: 95%;
`;

export const InputWrapper = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  font-size: 16px;
  margin-left: 10px;

  &:focus {
    outline: none;
  }
`;

export const AddIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid black;
`;