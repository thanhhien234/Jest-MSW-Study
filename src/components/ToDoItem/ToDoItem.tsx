import React from 'react';
import { ToDoItemWrapper } from './ToDoItem.styles';
import modifyIcon from '../../assets/modify-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import checkedBox from '../../assets/checked-box.png';
import uncheckedBox from '../../assets/unchecked-box.png';
import useDeleteItem from '../../hooks/useDeleteItem';
import useCheckItem from '../../hooks/useCheckItem';
import { ToDoItemInterface } from '../../utils/interface';
import useModalIsOpen from '../../store/useModalIsOpen';
import useSelectedItem from '../../store/useSelectedItem';

const ToDoItem = ({ item }: { item: ToDoItemInterface }) => {
    const { handleDeleteTodo } = useDeleteItem();
    const { handleCheckTodo } = useCheckItem();
    const { setIsOpen } = useModalIsOpen();
    const { setSelectedItem } = useSelectedItem();

    return (
        <ToDoItemWrapper $isCompleted={item.isCompleted}>
            {item.isCompleted ? (
                <img src={checkedBox}
                     alt="checked" 
                     onClick={() => handleCheckTodo(item.id)}
                />
            ) : (
                <img
                    src={uncheckedBox}
                    alt="unchecked"
                    onClick={() => handleCheckTodo(item.id)}
                />
            )}
            <span>{item.content}</span>
            <img src={modifyIcon} 
                 alt="modify" 
                 onClick={() => {
                    setIsOpen(true);
                    setSelectedItem(item);
                }}
            />
            <img src={deleteIcon}
                 alt="delete"
                 onClick={()=>handleDeleteTodo(item.id)}
            />
        </ToDoItemWrapper>
    )
}

export default ToDoItem;