import { renderHook, act } from '@testing-library/react';
import useRenderItem from '../useRenderItem';
import useItemsStore from '../../store/useItemsStore';

jest.mock('../../store/useItemsStore');

const mockData = [
    { id: 999, content: 'Test mock data 1', isCompleted: false },
    { id: 998, content: 'Test mock data 2', isCompleted: false },
];

const setItemsMock = jest.fn();

describe('useRenderItem test', () => {
    beforeEach(() => {
        (useItemsStore as unknown as jest.Mock).mockReturnValue({ setItems: setItemsMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetch and set items when ok: true', async () => {
        global.fetch = jest.fn(() =>  
            Promise.resolve({
                ok: true,
                json: async () => mockData,
            })
        ) as jest.Mock;

        const { result } = renderHook(() => useRenderItem()); // useRenderItem 훅을 렌더링

        await act( async () => {
            await result.current.getDatas(); // getDatas 메소드 실행
        });

        expect(fetch).toHaveBeenCalledWith('/api/todos', { method: 'GET' }); // fetch가 호출되었는지 확인
        expect(setItemsMock).toHaveBeenCalledWith(mockData); // setItems가 호출되었는지 확인
    });

    test('alert when ok: false', async () => {        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: async () => mockData,
            })
        ) as jest.Mock;
        global.alert = jest.fn();

        const { result } = renderHook(() => useRenderItem());

        await act( async () => {
            await result.current.getDatas();
        });

        expect(fetch).toHaveBeenCalledWith('/api/todos', { method: 'GET' });
        expect(alert).toHaveBeenCalledWith('useRenderItem.ts 에러'); // alert가 호출되었는지 확인
        expect(setItemsMock).not.toHaveBeenCalled();
    });
});
