import { Tarefa } from "../models/Tarefa";

export interface UpdateTarefaData {
    nome?: string;
    descricao?: string;
    status?: "to do" | "in progress" | "done";
    prioridade?: "low" | "medium" | "high";
    dataConclusao?: Date;
    responsavelId?: number;
    sprintId?: number;
    projetoId?: number;
}

export class TarefaRepository {
    
    async createTarefa(
        nome: string,
        descricao: string,
        status: "to do" | "in progress" | "done",
        prioridade: "low" | "medium" | "high",
        responsavelId: number,
        sprintId: number,
        projetoId: number
    ) {
        return await Tarefa.create({
            nome,
            descricao,
            status,
            prioridade,
            dataCriacao: new Date(),
            responsavelId,
            sprintId,
            projetoId
        });
    }
    
    async getAllTarefas() {
        return await Tarefa.findAll();
    }

    async getTarefaById(id: number) {
        return await Tarefa.findByPk(id);
    }

    async getTarefasBySprint(sprintId: number) {
        return await Tarefa.findAll({
            where: { sprintId }
        });
    }

    async getTarefasByProjeto(projetoId: number) {
        return await Tarefa.findAll({
            where: { projetoId }
        });
    }

    async getTarefasByResponsavel(responsavelId: number) {
        return await Tarefa.findAll({
            where: { responsavelId }
        });
    }

    async updateTarefa(id: number, data: UpdateTarefaData) {
        const tarefa = await Tarefa.findByPk(id);
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        
        // Se o status está sendo alterado para "done", definir data de conclusão
        if (data.status === "done" && tarefa.status !== "done") {
            data.dataConclusao = new Date();
        }
        
        // Se o status está sendo alterado de "done" para outro, remover data de conclusão
        if (data.status && data.status !== "done" && tarefa.status === "done") {
            data.dataConclusao = undefined;
        }
        
        await tarefa.update(data);
        return tarefa;
    }

    async deleteTarefa(id: number) {
        const tarefa = await Tarefa.findByPk(id);
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        
        await tarefa.destroy();
        return { message: "Tarefa deletada com sucesso" };
    }
}
