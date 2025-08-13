import { Request, Response } from "express";
import { TarefaService, CreateTarefaDTO, UpdateTarefaDTO } from "../services/tarefaService";

export class TarefaController {
    private tarefaService: TarefaService;

    constructor() {
        this.tarefaService = new TarefaService();
    }

    createTarefa = async (req: Request, res: Response) => {
        try {
            const data: CreateTarefaDTO = req.body;
            const tarefa = await this.tarefaService.createTarefa(data);
            res.status(201).json(tarefa);
        } catch (error: any) {
            res.status(400).json({
                message: "Erro ao criar a tarefa",
                error: error.message
            });
        }
    };

    getAllTarefas = async (req: Request, res: Response) => {
        try {
            const tarefas = await this.tarefaService.getAllTarefas();
            res.json(tarefas);
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao obter as tarefas",
                error: error.message
            });
        }
    };

    getTarefaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const tarefa = await this.tarefaService.getTarefaById(id);
            res.json(tarefa);
        } catch (error: any) {
            if (error.message === "Tarefa não encontrada" || error.message === "ID da tarefa inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter a tarefa",
                    error: error.message
                });
            }
        }
    };

    getTarefasBySprint = async (req: Request, res: Response) => {
        try {
            const sprintId = Number(req.params.sprintId);
            const tarefas = await this.tarefaService.getTarefasBySprint(sprintId);
            res.json(tarefas);
        } catch (error: any) {
            if (error.message === "ID da sprint inválido") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter as tarefas da sprint",
                    error: error.message
                });
            }
        }
    };

    getTarefasByProjeto = async (req: Request, res: Response) => {
        try {
            const projetoId = Number(req.params.projetoId);
            const tarefas = await this.tarefaService.getTarefasByProjeto(projetoId);
            res.json(tarefas);
        } catch (error: any) {
            if (error.message === "ID do projeto inválido") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter as tarefas do projeto",
                    error: error.message
                });
            }
        }
    };

    getTarefasByResponsavel = async (req: Request, res: Response) => {
        try {
            const responsavelId = Number(req.params.responsavelId);
            const tarefas = await this.tarefaService.getTarefasByResponsavel(responsavelId);
            res.json(tarefas);
        } catch (error: any) {
            if (error.message === "ID do responsável inválido") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter as tarefas do responsável",
                    error: error.message
                });
            }
        }
    };

    updateTarefa = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data: UpdateTarefaDTO = req.body;
            const tarefa = await this.tarefaService.updateTarefa(id, data);
            res.json(tarefa);
        } catch (error: any) {
            if (error.message === "Tarefa não encontrada" || error.message === "ID da tarefa inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({
                    message: "Erro ao atualizar a tarefa",
                    error: error.message
                });
            }
        }
    };

    deleteTarefa = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.tarefaService.deleteTarefa(id);
            res.json(result);
        } catch (error: any) {
            if (error.message === "Tarefa não encontrada" || error.message === "ID da tarefa inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao deletar a tarefa",
                    error: error.message
                });
            }
        }
    };
}
