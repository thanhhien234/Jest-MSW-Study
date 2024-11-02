import { renderHook, act } from '@testing-library/react';
import useModifyItem from '../useModifyItem';
import useRenderItem from '../useRenderItem';
import useSelectedItem from '../../store/useSelectedItem';
import { ToDoItemInterface } from '../../utils/interface';

jest.mock('../useRenderItem');
jest.mock('../../store/useSelectedItem');

describe('useModifyItem test', () => {
    let mockGetDatas: jest.Mock;
    let mockSelectedItem: ToDoItemInterface;

    beforeEach(() => {
        mockGetDatas = jest.fn();
        mockSelectedItem = {
            id: 1,
            content: 'example content',
            isCompleted: false,
        };
        (useRenderItem as unknown as jest.Mock).mockReturnValue({ getDatas: mockGetDatas });
        (useSelectedItem as unknown as jest.Mock).mockReturnValue({ selectedItem: mockSelectedItem });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('set initial content to selectedItem.content', () => {
        const { result } = renderHook(() => useModifyItem());
        expect(result.current.newContent).toBe('example content');
    });

    test ('set newContent correctly', () => {
        const { result } = renderHook(() => useModifyItem());
        act(() => {
            result.current.setNewContent('something');
        });
        expect(result.current.newContent).toBe('something');
    });

    test('modify todoItem on successful fetch', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        ) as jest.Mock;

        global.alert = jest.fn();

        const { result } = renderHook(() => useModifyItem());

        act(() => {
            result.current.setNewContent('New Content');
        });

        await act(async() => {
            await result.current.handleModifyTodo('New Content');
        });

        expect(fetch).toHaveBeenCalledWith(`/api/todos/${mockSelectedItem.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: 'New Content' }),
        });
        expect(global.alert).toHaveBeenCalledWith('수정되었습니다.');
        expect(mockGetDatas).toHaveBeenCalled();
    });

    test ('alert on failed fetch', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ) as jest.Mock;

        global.alert = jest.fn();

        const { result } = renderHook(() => useModifyItem());

        act(() => {
            result.current.setNewContent('New Content');
        });

        await act(async() => {
            await result.current.handleModifyTodo('New Content');
        });

        expect(global.alert).toHaveBeenCalledWith('useModifyItem.ts 에러');
    });
});