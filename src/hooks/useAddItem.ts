import { useState } from 'react';
import useRenderItem from './useRenderItem';

const useAddItem = () => {
    const [todo, setTodo] = useState('');
    const { getDatas } = useRenderItem();

    const handleAddTodo = async () => {
        if (todo.trim() === '') return;

        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: todo }),
        });

        if (!res.ok) {
            alert('useAddItem.ts 에러');
            return;
        }

        setTodo('');
        getDatas();
    };

    return { todo, setTodo, handleAddTodo };
};

export default useAddItem;
