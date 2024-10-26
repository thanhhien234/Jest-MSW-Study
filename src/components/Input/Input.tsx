import React from 'react';
import {InputContainer, InputWrapper, AddIcon} from './Input.styles';
import addIcon from '../../assets/add-icon.png';
import useAddItem from '../../hooks/useAddItem';

const Input = () => {
    const {
        todo,
        setTodo,
        handleAddTodo
    } = useAddItem();

    return (
        <InputContainer>
            <InputWrapper
                type="text"
                placeholder="추가하세요..."
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTodo();
                    }
                  }}
                value={todo}
            />
            <AddIcon
                src={addIcon}
                alt="send"
                onClick={handleAddTodo}
            />
        </InputContainer>

    )
}

export default Input;