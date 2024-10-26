import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoItem from '../ToDoItem';
import useDeleteItem from '../../../hooks/useDeleteItem';
import useCheckItem from '../../../hooks/useCheckItem';
import useModalIsOpen from '../../../store/useModalIsOpen';
import useSelectedItem from '../../../store/useSelectedItem';

//가짜 훅 모킹
jest.mock('../../../hooks/useDeleteItem');
jest.mock('../../../hooks/useCheckItem');
jest.mock('../../../store/useModalIsOpen');
jest.mock('../../../store/useSelectedItem');

//가짜 함수 생성
const mockHandleDeleteTodo = jest.fn();
const mockHandleCheckTodo = jest.fn();
const mockSetIsOpen = jest.fn();
const mockSetSelectedItem = jest.fn();


(useDeleteItem as jest.Mock).mockReturnValue({ handleDeleteTodo: mockHandleDeleteTodo }); //useDeleteItem 훅이 호출될 때 , handleDeleteTodo는 모킹된 함수 mockHandleDeleteTodo로 설정된다
(useCheckItem as jest.Mock).mockReturnValue({ handleCheckTodo: mockHandleCheckTodo });
(useModalIsOpen as unknown as jest.Mock).mockReturnValue({ setIsOpen: mockSetIsOpen });
(useSelectedItem as unknown as jest.Mock).mockReturnValue({ setSelectedItem: mockSetSelectedItem });

describe('ToDoItem component testing', () => {
    const mockItem = {
        id: 1,
        content: 'Test ToDo Item',
        isCompleted: false,
        created_at: '2024-10-01T00:00:00.000Z'
    };

    beforeEach(() => {
        render(<ToDoItem item={mockItem} />);
    });

    afterEach(() => {
        cleanup();
    });

    test('render ToDoItem with content', () => {
        const todoContent = screen.getByText('Test ToDo Item');
        expect(todoContent).toBeInTheDocument();
    });

    test('render unchecked box when item is not completed', () => {
        const uncheckedBoxImage = screen.getByAltText('unchecked');
        expect(uncheckedBoxImage).toBeInTheDocument();
    });

    test('call checkTodo when unchecked box is clicked', () => {
        const uncheckedBoxImage = screen.getByAltText('unchecked');
        fireEvent.click(uncheckedBoxImage);
        expect(mockHandleCheckTodo).toHaveBeenCalledWith(mockItem.id);
    });

    test('call setIsOpen and setSelectedItem when modify icon is clicked', () => {
        const modifyIconImage = screen.getByAltText('modify');
        fireEvent.click(modifyIconImage);
        expect(mockSetIsOpen).toHaveBeenCalledWith(true);
        expect(mockSetSelectedItem).toHaveBeenCalledWith(mockItem);
    });

    test('call deleteTodo when delete icon is clicked', () => {
        const deleteIconImage = screen.getByAltText('delete');
        fireEvent.click(deleteIconImage);
        expect(mockHandleCheckTodo).toHaveBeenCalledWith(mockItem.id);
    });

    test('render checked box when item is completed', () => {
        const completedItem = { ...mockItem, isCompleted: true };
        render(<ToDoItem item={completedItem} />);
        
        const checkedBoxImage = screen.getByAltText('checked');
        expect(checkedBoxImage).toBeInTheDocument();
    });
});
