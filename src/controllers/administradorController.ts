import { Request, Response } from "express";
import { AdministradorService, CreateAdministradorDTO, UpdateAdministradorDTO } from "../services/administradorService";

export class AdministradorController {
    private administradorService: AdministradorService;

    constructor() {
        this.administradorService = new AdministradorService();
    }

    // POST /administradores - Criar administrador
    createAdministrador = async (req: Request, res: Response) => {
        try {
            const data: CreateAdministradorDTO = req.body;
            const administrador = await this.administradorService.createAdministrador(data);
            res.status(201).json(administrador);
        } catch (error: any) {
            res.status(400).json({
                message: "Erro ao criar o administrador",
                error: error.message
            });
        }
    };

    // GET /administradores - Obter todos os administradores
    getAllAdministradores = async (req: Request, res: Response) => {
        try {
            const administradores = await this.administradorService.getAllAdministradores();
            res.json(administradores);
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao obter os administradores",
                error: error.message
            });
        }
    };

    // GET /administradores/:id - Obter administrador por ID
    getAdministradorById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrador = await this.administradorService.getAdministradorById(id);
            res.json(administrador);
        } catch (error: any) {
            if (error.message === "Administrador não encontrado" || error.message === "ID do administrador inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter o administrador",
                    error: error.message
                });
            }
        }
    };

    // GET /administradores/usuario/:userId - Obter administrador por ID do usuário
    getAdministradorByUserId = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const administrador = await this.administradorService.getAdministradorByUserId(userId);
            
            if (!administrador) {
                return res.status(404).json({ message: "Este usuário não é um administrador" });
            }
            
            res.json(administrador);
        } catch (error: any) {
            if (error.message === "ID do usuário inválido") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao obter o administrador",
                    error: error.message
                });
            }
        }
    };

    // GET /administradores/nivel/:nivel - Obter administradores por nível
    getAdministradoresByNivel = async (req: Request, res: Response) => {
        try {
            const nivel = req.params.nivel as 'super' | 'moderador' | 'suporte';
            
            if (!['super', 'moderador', 'suporte'].includes(nivel)) {
                return res.status(400).json({ message: "Nível inválido. Use: super, moderador ou suporte" });
            }
            
            const administradores = await this.administradorService.getAdministradoresByNivel(nivel);
            res.json(administradores);
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao obter os administradores",
                error: error.message
            });
        }
    };

    // GET /administradores/ativos - Obter administradores ativos
    getAdministradoresAtivos = async (req: Request, res: Response) => {
        try {
            const administradores = await this.administradorService.getAdministradoresAtivos();
            res.json(administradores);
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao obter os administradores ativos",
                error: error.message
            });
        }
    };

    // PUT /administradores/:id - Atualizar administrador
    updateAdministrador = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data: UpdateAdministradorDTO = req.body;
            const administrador = await this.administradorService.updateAdministrador(id, data);
            res.json(administrador);
        } catch (error: any) {
            if (error.message === "Administrador não encontrado" || error.message === "ID do administrador inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({
                    message: "Erro ao atualizar o administrador",
                    error: error.message
                });
            }
        }
    };

    // PATCH /administradores/:id/ativar - Ativar administrador
    ativarAdministrador = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrador = await this.administradorService.ativarAdministrador(id);
            res.json({
                message: "Administrador ativado com sucesso",
                administrador
            });
        } catch (error: any) {
            if (error.message === "Administrador não encontrado" || error.message === "ID do administrador inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao ativar o administrador",
                    error: error.message
                });
            }
        }
    };

    // PATCH /administradores/:id/desativar - Desativar administrador
    desativarAdministrador = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrador = await this.administradorService.desativarAdministrador(id);
            res.json({
                message: "Administrador desativado com sucesso",
                administrador
            });
        } catch (error: any) {
            if (error.message === "Administrador não encontrado" || error.message === "ID do administrador inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao desativar o administrador",
                    error: error.message
                });
            }
        }
    };

    // DELETE /administradores/:id - Deletar administrador
    deleteAdministrador = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.administradorService.deleteAdministrador(id);
            res.json(result);
        } catch (error: any) {
            if (error.message === "Administrador não encontrado" || error.message === "ID do administrador inválido") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Erro ao deletar o administrador",
                    error: error.message
                });
            }
        }
    };

    // POST /administradores/verificar-permissao - Verificar permissão do usuário
    verificarPermissao = async (req: Request, res: Response) => {
        try {
            const { userId, permissao } = req.body;
            
            if (!userId || !permissao) {
                return res.status(400).json({ message: "userId e permissao são obrigatórios" });
            }
            
            const temPermissao = await this.administradorService.verificarPermissao(userId, permissao);
            res.json({
                userId,
                permissao,
                temPermissao
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao verificar permissão",
                error: error.message
            });
        }
    };

    // GET /administradores/permissoes - Obter lista de permissões disponíveis
    getPermissoesDisponiveis = async (req: Request, res: Response) => {
        try {
            const permissoes = await this.administradorService.getPermissoesDisponiveis();
            res.json({
                permissoes,
                total: permissoes.length
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao obter permissões disponíveis",
                error: error.message
            });
        }
    };
}
