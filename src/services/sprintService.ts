import { SprintRepository } from "../repositories/sprintRepository";

export interface CreateSprintDTO {
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: "planning" | "in_progress" | "ended";
  projetoId: number;
}

export interface UpdateSprintDTO {
  nome?: string;
  descricao?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status?: "planning" | "in_progress" | "ended";
  projetoId?: number;
}

export class SprintService {
  private sprintRepository: SprintRepository;

  constructor() {
    this.sprintRepository = new SprintRepository();
  }

  async createSprint(data: CreateSprintDTO) {
    try {
      if (!data.nome || data.nome.trim().length === 0) {
        throw new Error("Nome da sprint é obrigatório");
      }

      if (!data.descricao || data.descricao.trim().length === 0) {
        throw new Error("Descrição da sprint é obrigatória");
      }

      if (new Date(data.dataInicio) > new Date(data.dataFim)) {
        throw new Error("Data de início não pode ser posterior à data de fim");
      }

      const sprint = await this.sprintRepository.createSprint(
        data.nome,
        data.descricao,
        data.dataInicio,
        data.dataFim,
        data.status,
        data.projetoId
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
                throw new Error("ID da sprint inválido");
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
                throw new Error("ID da sprint inválido");
            }

            const result = await this.sprintRepository.deleteSprint(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
export default SprintService;