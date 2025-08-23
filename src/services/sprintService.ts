import { SprintRepository } from "../repositories/sprintRepository";

export interface CreateSprintDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "planning" | "in_progress" | "ended";
  projectId: number;
}

export interface UpdateSprintDTO {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: "planning" | "in_progress" | "ended";
  projectId?: number;
}

export class SprintService {
  private sprintRepository: SprintRepository;

  constructor() {
    this.sprintRepository = new SprintRepository();
  }

  async createSprint(data: CreateSprintDTO) {
    try {
      if (!data.name || data.name.trim().length === 0) {
        throw new Error("Sprint name is required");
      }

      if (!data.description || data.description.trim().length === 0) {
        throw new Error("Sprint description is required");
      }

      if (new Date(data.startDate) > new Date(data.endDate)) {
        throw new Error("Start date cannot be after end date");
      }

      const sprint = await this.sprintRepository.createSprint(
        data.name,
        data.description,
        data.startDate,
        data.endDate,
        data.status,
        data.projectId
      );

      return sprint;
    } catch (error) {
      throw error;
    }
  }

  async getAllSprints() {
    try {
      return await this.sprintRepository.getAllSprints();
    } catch (error) {
      throw error;
    }
  }

  async getSprintById(id: number) {
    try {
      return await this.sprintRepository.getSprintById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateSprint(id: number, data: UpdateSprintDTO) {
    try {
      if (!id || id <= 0) {
        throw new Error("Invalid sprint ID");
      }

      const updatedSprint = await this.sprintRepository.updateSprint(id, data);
      return updatedSprint;
    } catch (error) {
      throw error;
    }
  }

  async deleteSprint(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("Invalid sprint ID");
      }

      const result = await this.sprintRepository.deleteSprint(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default SprintService;