import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/api-client";
import type { InsertTodo, UpdateTodo } from "../../../backend/src/db/schema";

export function useGetTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await client.api.todos.$get();
      const data = await response.json();

      if (Array.isArray(data)) {
        return data.map((todo) => ({
          ...todo,
          dueDate: new Date(todo.dueDate),
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
      } else {
        throw new Error(data.error);
      }
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: InsertTodo) => {
      const response = await client.api.todos.$post({ json: todo });
      return response.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: UpdateTodo & { id: string }) => {
      const response = await client.api.todos[":id"].$put({
        param: { id: todo.id },
        json: todo,
      });
      return response.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.todos[":id"].$delete({ param: { id } });
      return response.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
