import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModifyModal from '../ModifyModal';

describe('ModifyModal component testing', () => {
    const setIsOpenMock = jest.fn();

    test('render input field and buttons', () => {
        render(<ModifyModal setIsOpen={setIsOpenMock} />);
        const inputElement = screen.getByRole('textbox');
        const cancelButton = screen.getByText('취소');
        const saveButton = screen.getByText('저장');

        expect(inputElement).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        
    });
});