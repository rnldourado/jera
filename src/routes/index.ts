import { Router } from "express";
import userRoutes from "./userRoutes";
import projetoRoutes from "./projetoRoutes";
import sprintRoutes from "./sprintRoutes";
import tarefaRoutes from "./tarefaRoutes";
import administradorRoutes from "./administradorRoutes";
import administradorExtendedRoutes from "./administradorExtendedRoutes";

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações relacionadas aos usuários
 *   - name: Projetos
 *     description: Operações relacionadas aos projetos
 *   - name: Sprints
 *     description: Operações relacionadas às sprints
 *   - name: Tarefas
 *     description: Operações relacionadas às tarefas
 *   - name: Administradores
 *     description: Operações relacionadas aos administradores
 */

const router = Router();

// Registrar todas as rotas
router.use("/users", userRoutes);
router.use("/projetos", projetoRoutes);
router.use("/sprints", sprintRoutes);
router.use("/tarefas", tarefaRoutes);
router.use("/administradores", administradorRoutes);
router.use("/administradores", administradorExtendedRoutes);

export default router;
