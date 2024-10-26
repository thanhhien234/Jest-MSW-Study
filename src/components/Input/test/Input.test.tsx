import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input component testing', () => {
    // 각 테스트 케이스가 실행되기 전에 Input 컴포넌트를 렌더링
    beforeEach(() => {
        render(<Input />);
    });

    test('renders the input field and add icon', () => {
        const inputElement = screen.getByPlaceholderText('추가하세요...');
        const addIconElement = screen.getByAltText('send');

        expect(inputElement).toBeInTheDocument();
        expect(addIconElement).toBeInTheDocument();
    });

    // 'something'을 입력하면 inputField의 value가 'something'이 되는지 확인
    test('type in inputField', () => {
        const inputField = screen.getByPlaceholderText('추가하세요...') as HTMLInputElement;
        fireEvent.change(inputField, { target: { value: 'something' } });
        expect(inputField.value).toBe('something');
    });
    
    test('type in inputField', async () => {
        const inputField = screen.getByPlaceholderText('추가하세요...') as HTMLInputElement;
        await userEvent.type(inputField, 'something');
        expect(inputField.value).toBe('something');
      });
});