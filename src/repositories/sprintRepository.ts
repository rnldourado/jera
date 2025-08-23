import { Sprint } from "../models/Sprint";
import { UpdateSprintDTO } from "../services/sprintService";

export class SprintRepository {
    
    async createSprint(
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        status: "planning" | "in_progress" | "ended",
        projectId: number
    ) {
        return await Sprint.create({
            name,
            description,
            startDate,
            endDate,
            status,
            projectId
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
            throw new Error("Sprint not found");
        }
        
        await sprint.update(data);
        return sprint;
    }

    async deleteSprint(id: number) {
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            throw new Error("Sprint not found");
        }
        
        await sprint.destroy();
        return { message: "Sprint deleted successfully" };
    }
}