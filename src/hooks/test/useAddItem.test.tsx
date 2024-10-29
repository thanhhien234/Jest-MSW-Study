import { renderHook, act } from '@testing-library/react';
import useAddItem from '../useAddItem';
import useRenderItem from '../useRenderItem';

jest.mock('../useRenderItem');

describe('useAddItem test', () => {
    let mockGetDatas: jest.Mock;

    beforeEach(() => {
        mockGetDatas = jest.fn();
        (useRenderItem as jest.Mock).mockReturnValue({ getDatas: mockGetDatas });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('set todo text correctly', () => {
        const { result } = renderHook(() => useAddItem());
        act(() => {
            result.current.setTodo('New Todo');
        });
        expect(result.current.todo).toBe('New Todo');
    });

    test('add todoItem on sucessful fetch', async () => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true
            })
        ) as jest.Mock;

        const { result } = renderHook(() => useAddItem());

        await act(async() => {
            result.current.setTodo('New Todo');
        });

        await act(async() => {
            await result.current.handleAddTodo();
        });

        expect(fetch).toHaveBeenCalledWith('/api/todos', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: 'New Todo' }), 
        });
        expect(mockGetDatas).toHaveBeenCalled();
        expect(result.current.todo).toBe('');
    });

    test('alert on failed fetch', async () => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: false
            })
        ) as jest.Mock;

        global.alert = jest.fn();

        const { result } = renderHook(() => useAddItem());

        await act(async() => {
            result.current.setTodo('New Todo');
        });

        await act(async() => {
            await result.current.handleAddTodo();
        });

        expect(alert).toHaveBeenCalledWith('useAddItem.ts 에러');
    });
});
