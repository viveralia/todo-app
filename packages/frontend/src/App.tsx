import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { Counter } from "./components/Counter";
import { EmptyList } from "./components/EmptyList";
import { ThemeToggler } from "./components/ui/theme-toggler";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from "./hooks/useTodos";

export default function App() {
  const getTodos = useGetTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <div className="container max-w-lg mx-auto px-4 py-4 min-h-dvh flex flex-col">
        <Header className="mb-6" />
        <TodoForm
          className="mb-6"
          onAddTodo={(todo) =>
            createTodo.mutate({
              title: todo.title,
              dueDate: todo.dueDate.toISOString(),
              isCompleted: false,
            })
          }
        />
        <div className="flex flex-col gap-2 mb-6">
          {getTodos.data?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo.mutate(todo.id)}
              onToggle={() =>
                updateTodo.mutate({
                  id: todo.id,
                  isCompleted: !todo.isCompleted,
                })
              }
            />
          ))}
        </div>
        {getTodos.data?.length === 0 && <EmptyList className="mb-6" />}
        {(getTodos.data?.length ?? 0) > 0 && (
          <Counter
            total={getTodos.data!.length}
            completed={getTodos.data!.filter((t) => t.isCompleted).length}
            remaining={getTodos.data!.filter((t) => !t.isCompleted).length}
          />
        )}
        <div className="flex justify-end items-center gap-2 mt-auto">
          <p className="text-sm text-muted-foreground">Theme:</p>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
