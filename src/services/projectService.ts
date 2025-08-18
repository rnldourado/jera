import { ProjectRepository } from "../repositories/projectRepository";

export type ProjectStatus = "to do" | "in progress" | "done";

export interface CreateProjectDTO {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  deadline: Date;
  creatorId: number;
}

export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  startDate?: Date;
  deadline?: Date;
  creatorId?: number;
}

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async createProject(data: CreateProjectDTO) {
    try {
      // Business validation
      if (!data.name || data.name.trim().length === 0) {
        throw new Error("Project name is required");
      }

      if (!data.description || data.description.trim().length === 0) {
        throw new Error("Project description is required");
      }

      if (new Date(data.startDate) > new Date(data.deadline)) {
        throw new Error("Start date cannot be after deadline");
      }

      const project = await this.projectRepository.createProject(
        data.name,
        data.description,
        data.status,
        data.startDate,
        data.deadline,
        data.creatorId
      );

      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects() {
    try {
      return await this.projectRepository.getAllProjects();
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("Invalid project ID");
      }

      const project = await this.projectRepository.getProjectById(id);
      
      if (!project) {
        throw new Error("Project not found");
      }

      return project;
    } catch (error) {
      throw error;
    }
  }

  async updateProject(id: number, data: UpdateProjectDTO) {
    try {
      if (!id || id <= 0) {
        throw new Error("Invalid project ID");
      }

      const project = await this.projectRepository.getProjectById(id);
      
      if (!project) {
        throw new Error("Project not found");
      }

      if (data.name !== undefined && (!data.name || data.name.trim().length === 0)) {
        throw new Error("Project name cannot be empty");
      }

      if (data.description !== undefined && (!data.description || data.description.trim().length === 0)) {
        throw new Error("Project description cannot be empty");
      }

      if (data.startDate && data.deadline && new Date(data.startDate) > new Date(data.deadline)) {
        throw new Error("Start date cannot be after deadline");
      }

      if (data.name !== undefined) project.name = data.name;
      if (data.description !== undefined) project.description = data.description;
      if (data.status !== undefined) project.status = data.status;
      if (data.startDate !== undefined) project.startDate = data.startDate;
      if (data.deadline !== undefined) project.deadline = data.deadline;
      if (data.creatorId !== undefined) project.creatorId = data.creatorId;

      await project.save();
      return project;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("Invalid project ID");
      }

      const project = await this.projectRepository.getProjectById(id);
      
      if (!project) {
        throw new Error("Project not found");
      }

      await project.destroy();
      return { message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}
