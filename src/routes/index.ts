import { Router } from "express";
import userRoutes from "./userRoutes";
import projetoRoutes from "./projetoRoutes";

const router = Router();

// Registrar todas as rotas
router.use("/users", userRoutes);
router.use("/projetos", projetoRoutes);

export default router;
