import { useState } from "react";
import useSelectedItem from "../store/useSelectedItem";
import useRenderItem from "./useRenderItem";

function useModifyItem() {
  const { selectedItem } = useSelectedItem();
  const { getDatas } = useRenderItem();
  const [newContent, setNewContent] = useState(selectedItem.content);

  const handleModifyTodo = async (content: string) => {
    const res = await fetch(`/api/todos/${selectedItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      alert("useModifyItem.ts 에러");
      return;
    }

    alert('수정되었습니다.');
    getDatas();
  };

  return {
    handleModifyTodo,
    newContent,
    setNewContent
}
}

export default useModifyItem;