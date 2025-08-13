import { Request, Response } from "express";
import { UserService, CreateUserDTO, UpdateUserDTO } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const data: CreateUserDTO = req.body;
      const user = await this.userService.createUser(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ 
        message: "Erro ao criar o usuário", 
        error: error.message 
      });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Erro ao obter os usuários", 
        error: error.message 
      });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado" || error.message === "ID do usuário inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Erro ao obter o usuário", 
          error: error.message 
        });
      }
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateUserDTO = req.body;
      const user = await this.userService.updateUser(id, data);
      res.json(user);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado" || error.message === "ID do usuário inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ 
          message: "Erro ao atualizar o usuário", 
          error: error.message 
        });
      }
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.userService.deleteUser(id);
      res.status(204).json(result);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado" || error.message === "ID do usuário inválido") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Erro ao deletar o usuário", 
          error: error.message 
        });
      }
    }
  };
}
