import useRenderItem from "./useRenderItem";

function useDeleteItem() {
    const { getDatas } = useRenderItem();

    const handleDeleteTodo = async (id: number) => {
        const res = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            alert("useDeleteItem.ts 에러");
        }

        getDatas();
    }

    return { handleDeleteTodo };
}

export default useDeleteItem;