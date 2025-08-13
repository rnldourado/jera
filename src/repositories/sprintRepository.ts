import { Sprint } from "../models/Sprint";
import { UpdateSprintDTO } from "../services/sprintService";

export class SprintRepository {
    
    async createSprint(
        nome: string,
        descricao: string,
        dataInicio: Date,
        dataFim: Date,
        status: "planning" | "in_progress" | "ended",
        projetoId: number
    ) {
        return await Sprint.create({
            nome,
            descricao,
            dataInicio,
            dataFim,
            status,
            projetoId
        });
    }
    
    async getAllSprints() {
        return await Sprint.findAll();
    }

    async getSprintById(id: number) {
        return await Sprint.findByPk(id);
    }

    async updateSprint(id: number, data: UpdateSprintDTO) {
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            throw new Error("Sprint não encontrada");
        }
        
        await sprint.update(data);
        return sprint;
    }

    async deleteSprint(id: number) {
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            throw new Error("Sprint não encontrada");
        }
        
        await sprint.destroy();
        return { message: "Sprint deletada com sucesso" };
    }
}