import React from 'react';
import { ModalContainer, ModalMain, ModalButton, ModalButtonContainer } from './ModifyModal.styles';
import { InputContainer, InputWrapper } from '../Input/Input.styles';
import useModifyItem from '../../hooks/useModifyItem';

interface ModifyModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

const ModifyModal = ({ setIsOpen }: ModifyModalProps) => {
    const { newContent, setNewContent, handleModifyTodo } = useModifyItem();

    return (
        <ModalContainer onClick={() => setIsOpen(false)}>
            <ModalMain onClick={(e) => e.stopPropagation()}> 
                <h2>수정할 내용을 입력하세요</h2>
                <InputContainer>
                    <InputWrapper
                        type='text'
                        defaultValue={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                </InputContainer>
                <ModalButtonContainer>
                    <ModalButton $btnText='cancel'
                        onClick={() => setIsOpen(false)}
                    >
                        취소
                    </ModalButton>
                    <ModalButton $btnText='save'
                        onClick={() => {
                            setIsOpen(false);
                            handleModifyTodo(newContent);
                        }}
                    >
                        저장
                    </ModalButton>
                </ModalButtonContainer>
            </ModalMain> 
        </ModalContainer>
    );
}

export default ModifyModal;