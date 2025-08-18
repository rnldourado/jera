import { Project } from "../models/Project";

export class ProjectRepository {
    
    async createProject(
        name: string,
        description: string,
        status: "to do" | "in progress" | "done",
        startDate: Date,
        deadline: Date,
        creatorId: number
    ) {
        return await Project.create({
            name,
            description,
            status,
            startDate,
            deadline,
            creatorId
        });
    }
    
    async getAllProjects() {
        return await Project.findAll();
    }

    async getProjectById(id: number) {
        return await Project.findByPk(id);
    }
}