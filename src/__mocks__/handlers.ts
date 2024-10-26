import { http, HttpResponse } from 'msw';
import { ToDoItemInterface } from '../utils/interface';

let todoItems: ToDoItemInterface[] = [
    {
        id: 1,
        content: 'Example 1',
        isCompleted: false,
    },
    {
        id: 2,
        content: 'Example 2',
        isCompleted: false,
    },
    {
        id: 3,
        content: 'Example 3',
        isCompleted: false,
    },
    {
        id: 4,
        content: 'Example 4',
        isCompleted: false,
    }
];

// id 생성
const getNextId = (): number => {
    const totalItems = todoItems.length;
    return totalItems ? todoItems[totalItems - 1].id + 1 : 1;
};

// Request Body Interfaces
interface CreateTodoRequestBody {
    content: string;
}

interface UpdateTodoRequestBody {
    content?: string;
    isCompleted?: boolean; 
}


export const handlers = [
    // GET: todos 전체 조회
    http.get('/api/todos', () => {
        return HttpResponse.json(todoItems, { status: 200 });
    }),

    // POST: todo 생성
    http.post('/api/todos', async ({ request }) => {
        const body = await request.json() as CreateTodoRequestBody;

        if (!body.content) {
            return HttpResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        const newTodo: ToDoItemInterface = {
            id: getNextId(),
            content: body.content,
            isCompleted: false,
        };

        todoItems.push(newTodo);
        return HttpResponse.json(newTodo, { status: 201 });
    }),

    // PATCH: todo 수정
    http.patch('/api/todos/:id', async ({ params, request }) => {
        const id = parseInt(params.id as string);
        const body = await request.json() as UpdateTodoRequestBody;
        const todoIndex = todoItems.findIndex(item => item.id === id);

        if (todoIndex === -1) {
            return HttpResponse.json(
                { error: 'Todo not found' },
                { status: 404 }
            );
        }

        const updatedTodo = {
            ...todoItems[todoIndex],
            ...body,
            id
        };

        todoItems[todoIndex] = updatedTodo;
        return HttpResponse.json(updatedTodo, { status: 200 });
    }),

    // PATCH: todo check/uncheck
    http.patch('/api/todos/check/:id', ({ params }) => {
        const id = parseInt(params.id as string);
        const todoIndex = todoItems.findIndex(item => item.id === id);

        todoItems[todoIndex] = {
            ...todoItems[todoIndex],
            isCompleted: !todoItems[todoIndex].isCompleted,
        };

        return HttpResponse.json(todoItems[todoIndex], { status: 200 });
    }),

    // DELETE: todo 삭제
    http.delete('/api/todos/:id', ({ params }) => {
        const id = parseInt(params.id as string);
        const todoIndex = todoItems.findIndex(item => item.id === id);

        if (todoIndex === -1) {
            return HttpResponse.json(
                { error: 'Todo not found' },
                { status: 404 }
            );
        }

        todoItems = todoItems.filter(item => item.id !== id);
        return HttpResponse.json(
            { message: 'Todo deleted successfully' },
            { status: 200 }
        );
    }),
];
