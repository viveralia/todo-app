import { Calendar, Trash2 } from "lucide-react";
import { format, isBefore, isToday, startOfDay } from "date-fns";

import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { Todo } from "@/lib/types";

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const isDueToday = isToday(todo.dueDate);
  const isOverdue = isBefore(startOfDay(todo.dueDate), startOfDay(new Date()));

  return (
    <Card
      className={cn(
        "transition-all duration-100",
        isDueToday &&
          "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
        isOverdue &&
          "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
        todo.isCompleted &&
          "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 opacity-80 dark:opacity-60"
      )}
    >
      <CardContent className="flex items-start justify-between gap-4 px-3">
        <Checkbox
          id={todo.id}
          checked={todo.isCompleted}
          onCheckedChange={onToggle}
        />
        <div className="flex-1">
          <Label
            htmlFor={todo.id}
            className={cn(todo.isCompleted && "line-through")}
          >
            {todo.title}
          </Label>
          <small className="flex items-center gap-2 text-xs mt-1">
            <Calendar className="h-3 w-3" />
            <span
              className={cn(
                "text-muted-foreground",
                isDueToday && "text-blue-600",
                isOverdue && "text-red-600",
                todo.isCompleted && "text-muted-foreground"
              )}
            >
              {isDueToday ? "Today" : format(todo.dueDate, "PPP")}{" "}
              {isOverdue && " (Overdue)"}
            </span>
          </small>
        </div>
        <Button
          className="text-neutral-400 hover:text-red-600"
          variant="ghost"
          size="icon"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
