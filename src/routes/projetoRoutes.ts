import { Router } from "express";
import { ProjetoController } from "../controllers/projetoController";

const router = Router();
const projetoController = new ProjetoController();

// POST /projetos - Criar projeto
router.post("/", projetoController.createProjeto);

// GET /projetos - Obter todos os projetos
router.get("/", projetoController.getAllProjetos);

// GET /projetos/:id - Obter projeto por ID
router.get("/:id", projetoController.getProjetoById);

// PUT /projetos/:id - Atualizar projeto
router.put("/:id", projetoController.updateProjeto);

// DELETE /projetos/:id - Deletar projeto
router.delete("/:id", projetoController.deleteProjeto);

export default router;
