import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { Counter } from "./components/Counter";
import { EmptyList } from "./components/EmptyList";
import type { Todo } from "./lib/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ThemeToggler } from "./components/ui/theme-toggler";

export default function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <div className="container max-w-lg mx-auto px-4 py-4 min-h-dvh flex flex-col">
        <Header className="mb-6" />
        <TodoForm className="mb-6" onAddTodo={handleAddTodo} />
        <div className="flex flex-col gap-2 mb-6">
          {todos
            .sort((a, b) => {
              // First sort by completion status (uncompleted first)
              if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
              }
              // Then sort by due date (earliest first)
              return a.dueDate.getTime() - b.dueDate.getTime();
            })
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                onToggle={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id
                        ? { ...t, isCompleted: !t.isCompleted }
                        : t
                    )
                  )
                }
              />
            ))}
        </div>
        {todos.length === 0 && <EmptyList className="mb-6" />}
        {todos.length > 0 && (
          <Counter
            total={todos.length}
            completed={todos.filter((t) => t.isCompleted).length}
            remaining={todos.filter((t) => !t.isCompleted).length}
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
