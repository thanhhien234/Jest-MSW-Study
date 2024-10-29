import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModifyModal from '../ModifyModal';

describe('ModifyModal component testing', () => {
    const setIsOpenMock = jest.fn();
    
    beforeEach(() => {
        render(<ModifyModal setIsOpen={setIsOpenMock} />);
    });

    test('render input field and buttons', () => {
        const inputElement = screen.getByRole('textbox');
        const cancelButton = screen.getByText('취소');
        const saveButton = screen.getByText('저장');

        expect(inputElement).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        
    });

    test('type in inputField ', () => {
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'something' } });
        expect(inputElement).toHaveValue('something');
    });
});