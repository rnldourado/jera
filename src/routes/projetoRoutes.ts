import { Router, Request, Response } from "express";
import { ProjetoRepository } from "../repository/projetoRepository";

const router = Router();

// POST /projetos - Criar projeto
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, status, dataInicio, prazo, criadorId } = req.body;
    const projetoRepo = new ProjetoRepository();
    const projeto = await projetoRepo.createProjeto(nome, descricao, status, dataInicio, prazo, criadorId);
    res.json(projeto);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar o projeto", error: error.message });
  }
});

// GET /projetos - Obter todos os projetos
router.get("/", async (req: Request, res: Response) => {
  try {
    const projetoRepo = new ProjetoRepository();
    const projetos = await projetoRepo.getAllProjetos();
    res.json(projetos);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao obter os projetos", error: error.message });
  }
});

export default router;
