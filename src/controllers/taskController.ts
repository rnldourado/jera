import { Request, Response } from "express";
import { TaskService, CreateTaskDTO, UpdateTaskDTO } from "../services/taskService";

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    createTask = async (req: Request, res: Response) => {
        try {
            const data: CreateTaskDTO = req.body;
            const task = await this.taskService.createTask(data);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(400).json({
                message: "Error creating task",
                error: error.message
            });
        }
    };

    getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.json(tasks);
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching tasks",
                error: error.message
            });
        }
    };

    getTaskById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const task = await this.taskService.getTaskById(id);
            res.json(task);
        } catch (error: any) {
            if (error.message === "Task not found" || error.message === "Invalid task ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching task",
                    error: error.message
                });
            }
        }
    };

    getTasksBySprint = async (req: Request, res: Response) => {
        try {
            const sprintId = Number(req.params.sprintId);
            const tasks = await this.taskService.getTasksBySprint(sprintId);
            res.json(tasks);
        } catch (error: any) {
            if (error.message === "Invalid sprint ID") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching sprint tasks",
                    error: error.message
                });
            }
        }
    };

    getTasksByProject = async (req: Request, res: Response) => {
        try {
            const projectId = Number(req.params.projectId);
            const tasks = await this.taskService.getTasksByProject(projectId);
            res.json(tasks);
        } catch (error: any) {
            if (error.message === "Invalid project ID") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching project tasks",
                    error: error.message
                });
            }
        }
    };

    getTasksByAssignee = async (req: Request, res: Response) => {
        try {
            const assigneeId = Number(req.params.assigneeId);
            const tasks = await this.taskService.getTasksByAssignee(assigneeId);
            res.json(tasks);
        } catch (error: any) {
            if (error.message === "Invalid assignee ID") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching assignee tasks",
                    error: error.message
                });
            }
        }
    };

    updateTask = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data: UpdateTaskDTO = req.body;
            const task = await this.taskService.updateTask(id, data);
            res.json(task);
        } catch (error: any) {
            if (error.message === "Task not found" || error.message === "Invalid task ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({
                    message: "Error updating task",
                    error: error.message
                });
            }
        }
    };

    deleteTask = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.taskService.deleteTask(id);
            res.json(result);
        } catch (error: any) {
            if (error.message === "Task not found" || error.message === "Invalid task ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error deleting task",
                    error: error.message
                });
            }
        }
    };
}
