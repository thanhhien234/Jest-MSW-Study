import { renderHook, act } from '@testing-library/react';
import useCheckItem from '../useCheckItem';
import useRenderItem from '../useRenderItem';

jest.mock('../useRenderItem');

describe('useCheckItem test', () => {
    let mockGetDatas: jest.Mock;

    beforeEach(() => {
        mockGetDatas = jest.fn();
        (useRenderItem as jest.Mock).mockReturnValue({ getDatas: mockGetDatas });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('check todoItem on sucessful fetch', async () => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true
            })
        ) as jest.Mock;

        const { result } = renderHook(() => useCheckItem());

        await act(async() => {
            await result.current.handleCheckTodo(1);
        });

        expect(fetch).toHaveBeenCalledWith('/api/todos/check/1', {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' }
        });

        expect(mockGetDatas).toHaveBeenCalled();
    });

    test('alert on failed fetch', async () => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: false
            })
        ) as jest.Mock;

        global.alert = jest.fn();

        const { result } = renderHook(() => useCheckItem());

        await act(async() => {  
            await result.current.handleCheckTodo(1);
        });

        expect(alert).toHaveBeenCalledWith('useCheckItem.ts 에러');
    });
});