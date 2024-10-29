import { renderHook, act } from '@testing-library/react';
import useDeleteItem from '../useDeleteItem';
import useRenderItem from '../useRenderItem';

jest.mock('../useRenderItem');

describe('useDeleteItem test', () => {
    let mockGetDatas: jest.Mock;

    beforeEach(() => {
        mockGetDatas = jest.fn();
        (useRenderItem as jest.Mock).mockReturnValue({ getDatas: mockGetDatas });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('delete todoItem on successful fetch', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        ) as jest.Mock;

        const { result } = renderHook(() => useDeleteItem());

        await act(async() => {
            await result.current.handleDeleteTodo(1);
        });

        expect(fetch).toHaveBeenCalledWith('/api/todos/1', {
            method: 'DELETE',
        });
        expect(mockGetDatas).toHaveBeenCalled();
    });

    test('alert on failed fetch', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ) as jest.Mock;

        global.alert = jest.fn();

        const { result } = renderHook(() => useDeleteItem());

        await act(async() => {
            await result.current.handleDeleteTodo(1);
        });

        expect(global.alert).toHaveBeenCalledWith('useDeleteItem.ts 에러');
    });
});
