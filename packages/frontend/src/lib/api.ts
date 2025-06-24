import type { Todo } from "./types";

const API_BASE_URL = "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.error || `HTTP ${response.status}`
    );
  }
  return response.json();
}

// Type-safe API request data
export interface CreateTodoData {
  title: string;
  isCompleted?: boolean;
  dueDate: string; // ISO datetime string
}

export interface UpdateTodoData {
  title?: string;
  isCompleted?: boolean;
  dueDate?: string; // ISO datetime string
}

export const api = {
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    const todos = await handleResponse<Todo[]>(response);
    return todos.map((todo) => ({
      ...todo,
      dueDate: new Date(todo.dueDate),
    }));
  },

  // Create a new todo
  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newTodo = await handleResponse<Todo>(response);
    return {
      ...newTodo,
      dueDate: new Date(newTodo.dueDate),
    };
  },

  // Update a todo
  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedTodo = await handleResponse<Todo>(response);
    return {
      ...updatedTodo,
      dueDate: new Date(updatedTodo.dueDate),
    };
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    await handleResponse(response);
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: "PATCH",
    });
    const toggledTodo = await handleResponse<Todo>(response);
    return {
      ...toggledTodo,
      dueDate: new Date(toggledTodo.dueDate),
    };
  },

  // Health check
  async health(): Promise<{
    status: string;
    timestamp: string;
    database: string;
  }> {
    const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health`);
    return handleResponse(response);
  },
};
