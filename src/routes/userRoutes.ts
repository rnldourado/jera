import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

// POST /users - Criar usuário
router.post("/", userController.createUser);

// GET /users - Obter todos os usuários
router.get("/", userController.getAllUsers);

// GET /users/:id - Obter usuário por ID
router.get("/:id", userController.getUserById);

// PUT /users/:id - Atualizar usuário
router.put("/:id", userController.updateUser);

// DELETE /users/:id - Deletar usuário
router.delete("/:id", userController.deleteUser);

export default router;
