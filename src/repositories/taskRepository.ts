import { Task } from "../models/Task";

export interface UpdateTaskData {
    name?: string;
    description?: string;
    status?: "to do" | "in progress" | "done";
    priority?: "low" | "medium" | "high";
    completedAt?: Date;
    assigneeId?: number;
    sprintId?: number;
    projectId?: number;
}

export class TaskRepository {
    
    async createTask(
        name: string,
        description: string,
        status: "to do" | "in progress" | "done",
        priority: "low" | "medium" | "high",
        assigneeId: number,
        sprintId: number,
        projectId: number
    ) {
        return await Task.create({
            name,
            description,
            status,
            priority,
            createdAt: new Date(),
            assigneeId,
            sprintId,
            projectId
        });
    }
    
    async getAllTasks() {
        return await Task.findAll();
    }

    async getTaskById(id: number) {
        return await Task.findByPk(id);
    }

    async getTasksBySprint(sprintId: number) {
        return await Task.findAll({
            where: { sprintId }
        });
    }

    async getTasksByProject(projectId: number) {
        return await Task.findAll({
            where: { projectId }
        });
    }

    async getTasksByAssignee(assigneeId: number) {
        return await Task.findAll({
            where: { assigneeId }
        });
    }

    async updateTask(id: number, data: UpdateTaskData) {
        const task = await Task.findByPk(id);
        if (!task) {
            throw new Error("Task not found");
        }
        
        // If status is being changed to "done", set completion date
        if (data.status === "done" && task.status !== "done") {
            data.completedAt = new Date();
        }
        
        // If status is being changed from "done" to another, remove completion date
        if (data.status && data.status !== "done" && task.status === "done") {
            data.completedAt = undefined;
        }
        
        await task.update(data);
        return task;
    }

    async deleteTask(id: number) {
        const task = await Task.findByPk(id);
        if (!task) {
            throw new Error("Task not found");
        }
        
        await task.destroy();
        return { message: "Task deleted successfully" };
    }
}
