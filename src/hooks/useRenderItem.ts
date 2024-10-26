import useItemsStore from '../store/useItemsStore';

function useRenderItem() {
    const { setItems } = useItemsStore();

    const getDatas = async () => {
        const res = await fetch('/api/todos', {
            method: 'GET',
        });
        if (!res.ok) {
            alert('useRenderItem.ts 에러');
        }
        const data = await res.json();
        setItems(data);
    };

    return { getDatas };
}

export default useRenderItem;