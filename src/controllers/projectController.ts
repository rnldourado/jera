import { Request, Response } from "express";
import { ProjectService, CreateProjectDTO, UpdateProjectDTO } from "../services/projectService";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  createProject = async (req: Request, res: Response) => {
    try {
      const data: CreateProjectDTO = req.body;
      const project = await this.projectService.createProject(data);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ 
        message: "Error creating project", 
        error: error.message 
      });
    }
  };

  getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectService.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching projects", 
        error: error.message 
      });
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const project = await this.projectService.getProjectById(id);
      res.json(project);
    } catch (error: any) {
      if (error.message === "Project not found" || error.message === "Invalid project ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Error fetching project", 
          error: error.message 
        });
      }
    }
  };

  updateProject = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateProjectDTO = req.body;
      const project = await this.projectService.updateProject(id, data);
      res.json(project);
    } catch (error: any) {
      if (error.message === "Project not found" || error.message === "Invalid project ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ 
          message: "Error updating project", 
          error: error.message 
        });
      }
    }
  };

  deleteProject = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.projectService.deleteProject(id);
      res.status(204).json(result);
    } catch (error: any) {
      if (error.message === "Project not found" || error.message === "Invalid project ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Error deleting project", 
          error: error.message 
        });
      }
    }
  };
}
