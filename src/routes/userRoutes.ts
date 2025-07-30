import { Router, Request, Response } from "express";
import { UserRepository } from "../repository/userRepository";

const router = Router();
const userRepo = new UserRepository();

// POST /users - Criar usuário
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRepo.createUser(name, email, password);
    res.json(user); // Retorna o usuário criado
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
  }
});

// GET /users - Obter todos os usuários
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users); // Retorna todos os usuários
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
  }
});

export default router;
