import { AdministradorRepository, UpdateAdministradorData } from "../repositories/administradorRepository";

export interface CreateAdministradorDTO {
    userId: number;
    nivel: 'super' | 'moderador' | 'suporte';
    permissoes?: string[];
    ativo?: boolean;
}

export interface UpdateAdministradorDTO {
    nivel?: 'super' | 'moderador' | 'suporte';
    permissoes?: string[];
    ativo?: boolean;
}

// Constantes de permissões disponíveis
export const PERMISSOES_DISPONIVEIS = [
    'gerenciar_usuarios',
    'gerenciar_projetos',
    'gerenciar_sprints',
    'gerenciar_tarefas',
    'gerenciar_administradores',
    'visualizar_relatorios',
    'gerenciar_sistema',
    'aprovar_projetos',
    'deletar_dados'
] as const;

export class AdministradorService {
    private administradorRepository: AdministradorRepository;

    constructor() {
        this.administradorRepository = new AdministradorRepository();
    }

    async createAdministrador(data: CreateAdministradorDTO) {
        try {
            // Validações de negócio
            if (!data.userId || data.userId <= 0) {
                throw new Error("ID do usuário é obrigatório e deve ser válido");
            }

            // Verificar se o usuário já é administrador
            const administradorExistente = await this.administradorRepository.getAdministradorByUserId(data.userId);
            if (administradorExistente) {
                throw new Error("Este usuário já é um administrador");
            }

            // Validar permissões se fornecidas
            if (data.permissoes && data.permissoes.length > 0) {
                const permissoesInvalidas = data.permissoes.filter(
                    permissao => !PERMISSOES_DISPONIVEIS.includes(permissao as any)
                );
                if (permissoesInvalidas.length > 0) {
                    throw new Error(`Permissões inválidas: ${permissoesInvalidas.join(', ')}`);
                }
            }

            // Definir permissões padrão baseadas no nível
            let permissoesPadrao = data.permissoes || [];
            if (!data.permissoes || data.permissoes.length === 0) {
                switch (data.nivel) {
                    case 'super':
                        permissoesPadrao = [...PERMISSOES_DISPONIVEIS];
                        break;
                    case 'moderador':
                        permissoesPadrao = ['gerenciar_usuarios', 'gerenciar_projetos', 'gerenciar_sprints', 'visualizar_relatorios'];
                        break;
                    case 'suporte':
                        permissoesPadrao = ['visualizar_relatorios'];
                        break;
                }
            }

            const administrador = await this.administradorRepository.createAdministrador(
                data.userId,
                data.nivel,
                permissoesPadrao,
                data.ativo !== undefined ? data.ativo : true
            );

            return administrador;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdministradores() {
        try {
            return await this.administradorRepository.getAllAdministradores();
        } catch (error) {
            throw error;
        }
    }

    async getAdministradorById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID do administrador inválido");
            }

            const administrador = await this.administradorRepository.getAdministradorById(id);
            if (!administrador) {
                throw new Error("Administrador não encontrado");
            }

            return administrador;
        } catch (error) {
            throw error;
        }
    }

    async getAdministradorByUserId(userId: number) {
        try {
            if (!userId || userId <= 0) {
                throw new Error("ID do usuário inválido");
            }

            return await this.administradorRepository.getAdministradorByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAdministradoresByNivel(nivel: 'super' | 'moderador' | 'suporte') {
        try {
            return await this.administradorRepository.getAdministradoresByNivel(nivel);
        } catch (error) {
            throw error;
        }
    }

    async getAdministradoresAtivos() {
        try {
            return await this.administradorRepository.getAdministradoresAtivos();
        } catch (error) {
            throw error;
        }
    }

    async updateAdministrador(id: number, data: UpdateAdministradorDTO) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID do administrador inválido");
            }

            // Validar permissões se fornecidas
            if (data.permissoes && data.permissoes.length > 0) {
                const permissoesInvalidas = data.permissoes.filter(
                    permissao => !PERMISSOES_DISPONIVEIS.includes(permissao as any)
                );
                if (permissoesInvalidas.length > 0) {
                    throw new Error(`Permissões inválidas: ${permissoesInvalidas.join(', ')}`);
                }
            }

            const updatedAdministrador = await this.administradorRepository.updateAdministrador(id, data);
            return updatedAdministrador;
        } catch (error) {
            throw error;
        }
    }

    async ativarAdministrador(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID do administrador inválido");
            }

            return await this.administradorRepository.ativarAdministrador(id);
        } catch (error) {
            throw error;
        }
    }

    async desativarAdministrador(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID do administrador inválido");
            }

            return await this.administradorRepository.desativarAdministrador(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteAdministrador(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID do administrador inválido");
            }

            const result = await this.administradorRepository.deleteAdministrador(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async verificarPermissao(userId: number, permissao: string): Promise<boolean> {
        try {
            if (!userId || userId <= 0) {
                return false;
            }

            return await this.administradorRepository.verificarPermissao(userId, permissao);
        } catch (error) {
            return false;
        }
    }

    async getPermissoesDisponiveis() {
        return PERMISSOES_DISPONIVEIS;
    }
}

export default AdministradorService;
