import { TarefaRepository, UpdateTarefaData } from "../repositories/tarefaRepository";

export interface CreateTarefaDTO {
    nome: string;
    descricao: string;
    status: "to do" | "in progress" | "done";
    prioridade: "low" | "medium" | "high";
    responsavelId: number;
    sprintId: number;
    projetoId: number;
}

export interface UpdateTarefaDTO {
    nome?: string;
    descricao?: string;
    status?: "to do" | "in progress" | "done";
    prioridade?: "low" | "medium" | "high";
    dataConclusao?: Date;
    responsavelId?: number;
    sprintId?: number;
    projetoId?: number;
}

export class TarefaService {
    private tarefaRepository: TarefaRepository;

    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async createTarefa(data: CreateTarefaDTO) {
        try {
            if (!data.nome || data.nome.trim().length === 0) {
                throw new Error("Nome da tarefa é obrigatório");
            }

            if (!data.descricao || data.descricao.trim().length === 0) {
                throw new Error("Descrição da tarefa é obrigatória");
            }

            if (!data.responsavelId || data.responsavelId <= 0) {
                throw new Error("ID do responsável é obrigatório e deve ser válido");
            }

            if (!data.sprintId || data.sprintId <= 0) {
                throw new Error("ID da sprint é obrigatório e deve ser válido");
            }

            if (!data.projetoId || data.projetoId <= 0) {
                throw new Error("ID do projeto é obrigatório e deve ser válido");
            }

            const tarefa = await this.tarefaRepository.createTarefa(
                data.nome,
                data.descricao,
                data.status,
                data.prioridade,
                data.responsavelId,
                data.sprintId,
                data.projetoId
            );

            return tarefa;
        } catch (error) {
            throw error;
        }
    }

    async getAllTarefas() {
        try {
            return await this.tarefaRepository.getAllTarefas();
        } catch (error) {
            throw error;
        }
    }

    async getTarefaById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID da tarefa inválido");
            }

            const tarefa = await this.tarefaRepository.getTarefaById(id);
            if (!tarefa) {
                throw new Error("Tarefa não encontrada");
            }

            return tarefa;
        } catch (error) {
            throw error;
        }
    }

    async getTarefasBySprint(sprintId: number) {
        try {
            if (!sprintId || sprintId <= 0) {
                throw new Error("ID da sprint inválido");
            }

            return await this.tarefaRepository.getTarefasBySprint(sprintId);
        } catch (error) {
            throw error;
        }
    }

    async getTarefasByProjeto(projetoId: number) {
        try {
            if (!projetoId || projetoId <= 0) {
                throw new Error("ID do projeto inválido");
            }

            return await this.tarefaRepository.getTarefasByProjeto(projetoId);
        } catch (error) {
            throw error;
        }
    }

    async getTarefasByResponsavel(responsavelId: number) {
        try {
            if (!responsavelId || responsavelId <= 0) {
                throw new Error("ID do responsável inválido");
            }

            return await this.tarefaRepository.getTarefasByResponsavel(responsavelId);
        } catch (error) {
            throw error;
        }
    }

    async updateTarefa(id: number, data: UpdateTarefaDTO) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID da tarefa inválido");
            }

            if (data.nome !== undefined && data.nome.trim().length === 0) {
                throw new Error("Nome da tarefa não pode ser vazio");
            }

            if (data.responsavelId !== undefined && data.responsavelId <= 0) {
                throw new Error("ID do responsável deve ser válido");
            }

            if (data.sprintId !== undefined && data.sprintId <= 0) {
                throw new Error("ID da sprint deve ser válido");
            }

            if (data.projetoId !== undefined && data.projetoId <= 0) {
                throw new Error("ID do projeto deve ser válido");
            }

            const updatedTarefa = await this.tarefaRepository.updateTarefa(id, data);
            return updatedTarefa;
        } catch (error) {
            throw error;
        }
    }

    async deleteTarefa(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID da tarefa inválido");
            }

            const result = await this.tarefaRepository.deleteTarefa(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default TarefaService;
