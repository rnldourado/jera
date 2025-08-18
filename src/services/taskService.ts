import { TaskRepository, UpdateTaskData } from "../repositories/taskRepository";

export interface CreateTaskDTO {
    name: string;
    description: string;
    status: "to do" | "in progress" | "done";
    priority: "low" | "medium" | "high";
    assigneeId: number;
    sprintId: number;
    projectId: number;
}

export interface UpdateTaskDTO {
    name?: string;
    description?: string;
    status?: "to do" | "in progress" | "done";
    priority?: "low" | "medium" | "high";
    completedAt?: Date;
    assigneeId?: number;
    sprintId?: number;
    projectId?: number;
}

export class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async createTask(data: CreateTaskDTO) {
        try {
            if (!data.name || data.name.trim().length === 0) {
                throw new Error("Task name is required");
            }

            if (!data.description || data.description.trim().length === 0) {
                throw new Error("Task description is required");
            }

            if (!data.assigneeId || data.assigneeId <= 0) {
                throw new Error("Assignee ID is required and must be valid");
            }

            if (!data.sprintId || data.sprintId <= 0) {
                throw new Error("Sprint ID is required and must be valid");
            }

            if (!data.projectId || data.projectId <= 0) {
                throw new Error("Project ID is required and must be valid");
            }

            const task = await this.taskRepository.createTask(
                data.name,
                data.description,
                data.status,
                data.priority,
                data.assigneeId,
                data.sprintId,
                data.projectId
            );

            return task;
        } catch (error) {
            throw error;
        }
    }

    async getAllTasks() {
        try {
            return await this.taskRepository.getAllTasks();
        } catch (error) {
            throw error;
        }
    }

    async getTaskById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid task ID");
            }

            const task = await this.taskRepository.getTaskById(id);
            if (!task) {
                throw new Error("Task not found");
            }

            return task;
        } catch (error) {
            throw error;
        }
    }

    async getTasksBySprint(sprintId: number) {
        try {
            if (!sprintId || sprintId <= 0) {
                throw new Error("Invalid sprint ID");
            }

            return await this.taskRepository.getTasksBySprint(sprintId);
        } catch (error) {
            throw error;
        }
    }

    async getTasksByProject(projectId: number) {
        try {
            if (!projectId || projectId <= 0) {
                throw new Error("Invalid project ID");
            }

            return await this.taskRepository.getTasksByProject(projectId);
        } catch (error) {
            throw error;
        }
    }

    async getTasksByAssignee(assigneeId: number) {
        try {
            if (!assigneeId || assigneeId <= 0) {
                throw new Error("Invalid assignee ID");
            }

            return await this.taskRepository.getTasksByAssignee(assigneeId);
        } catch (error) {
            throw error;
        }
    }

    async updateTask(id: number, data: UpdateTaskDTO) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid task ID");
            }

            if (data.name !== undefined && data.name.trim().length === 0) {
                throw new Error("Task name cannot be empty");
            }

            if (data.assigneeId !== undefined && data.assigneeId <= 0) {
                throw new Error("Assignee ID must be valid");
            }

            if (data.sprintId !== undefined && data.sprintId <= 0) {
                throw new Error("Sprint ID must be valid");
            }

            if (data.projectId !== undefined && data.projectId <= 0) {
                throw new Error("Project ID must be valid");
            }

            const updatedTask = await this.taskRepository.updateTask(id, data);
            return updatedTask;
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid task ID");
            }

            const result = await this.taskRepository.deleteTask(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default TaskService;
