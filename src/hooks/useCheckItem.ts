import useRenderItem from "./useRenderItem";

function useCheckItem() {
  const { getDatas } = useRenderItem();

  const handleCheckTodo = async (id: number) => {
    const res = await fetch(`/api/todos/check/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("useCheckItem.ts 에러");
      return;
    }

    getDatas();
  };

  return { handleCheckTodo };
}

export default useCheckItem;