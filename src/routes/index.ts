import { Router } from "express";
import userRoutes from "./userRoutes";
import projetoRoutes from "./projetoRoutes";

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações relacionadas aos usuários
 *   - name: Projetos
 *     description: Operações relacionadas aos projetos
 */

const router = Router();

// Registrar todas as rotas
router.use("/users", userRoutes);
router.use("/projetos", projetoRoutes);

export default router;
