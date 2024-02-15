import { Task } from "@prisma/client";

export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type UpdateTask = Partial<CreateTask>;
