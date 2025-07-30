import { Projeto } from "../models/Projeto";

export class ProjetoRepository {
    // Criar um novo projeto
    async createProjeto(
        nome: string,
        descricao: string,
        status: "to do" | "in progress" | "done",
        dataInicio: Date,
        prazo: Date,
        criadorId: number
    ) {
        return await Projeto.create({
            nome,
            descricao,
            status,
            dataInicio,
            prazo,
            criadorId
        });
    }

    
    async getAllProjetos() {
        return await Projeto.findAll();
    }
}