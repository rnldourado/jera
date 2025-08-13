import { Request, Response } from "express";
import { ProjetoService, CreateProjetoDTO, UpdateProjetoDTO } from "../services/projetoService";

export class ProjetoController {
  private projetoService: ProjetoService;

  constructor() {
    this.projetoService = new ProjetoService();
  }

  // POST /projetos - Criar projeto
  createProjeto = async (req: Request, res: Response) => {
    try {
      const data: CreateProjetoDTO = req.body;
      const projeto = await this.projetoService.createProjeto(data);
      res.status(201).json(projeto);
    } catch (error: any) {
      res.status(400).json({ 
        message: "Erro ao criar o projeto", 
        error: error.message 
      });
    }
  };

  // GET /projetos - Obter todos os projetos
  getAllProjetos = async (req: Request, res: Response) => {
    try {
      const projetos = await this.projetoService.getAllProjetos();
      res.json(projetos);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Erro ao obter os projetos", 
        error: error.message 
      });
    }
  };

  // GET /projetos/:id - Obter projeto por ID
  getProjetoById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const projeto = await this.projetoService.getProjetoById(id);
      res.json(projeto);
    } catch (error: any) {
      if (error.message === "Projeto não encontrado" || error.message === "ID do projeto inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Erro ao obter o projeto", 
          error: error.message 
        });
      }
    }
  };

  // PUT /projetos/:id - Atualizar projeto
  updateProjeto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateProjetoDTO = req.body;
      const projeto = await this.projetoService.updateProjeto(id, data);
      res.json(projeto);
    } catch (error: any) {
      if (error.message === "Projeto não encontrado" || error.message === "ID do projeto inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ 
          message: "Erro ao atualizar o projeto", 
          error: error.message 
        });
      }
    }
  };

  // DELETE /projetos/:id - Deletar projeto
  deleteProjeto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.projetoService.deleteProjeto(id);
      res.status(204).json(result);
    } catch (error: any) {
      if (error.message === "Projeto não encontrado" || error.message === "ID do projeto inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Erro ao deletar o projeto", 
          error: error.message 
        });
      }
    }
  };
}
