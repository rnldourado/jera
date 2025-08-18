import { Administrador } from "../models/Administrador";
import { User } from "../models/User";

export interface UpdateAdministradorData {
    nivel?: 'super' | 'moderador' | 'suporte';
    permissoes?: string[];
    ativo?: boolean;
}

export class AdministradorRepository {
    
    async createAdministrador(
        userId: number,
        nivel: 'super' | 'moderador' | 'suporte',
        permissoes: string[] = [],
        ativo: boolean = true
    ) {
        return await Administrador.create({
            userId,
            nivel,
            permissoes,
            dataAtivacao: new Date(),
            ativo
        });
    }
    
    async getAllAdministradores() {
        return await Administrador.findAll({
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministradorById(id: number) {
        return await Administrador.findByPk(id, {
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministradorByUserId(userId: number) {
        return await Administrador.findOne({
            where: { userId },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministradoresByNivel(nivel: 'super' | 'moderador' | 'suporte') {
        return await Administrador.findAll({
            where: { nivel },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministradoresAtivos() {
        return await Administrador.findAll({
            where: { ativo: true },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async updateAdministrador(id: number, data: UpdateAdministradorData) {
        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            throw new Error("Administrador não encontrado");
        }
        
        await administrador.update(data);
        return administrador;
    }

    async ativarAdministrador(id: number) {
        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            throw new Error("Administrador não encontrado");
        }
        
        await administrador.update({ ativo: true });
        return administrador;
    }

    async desativarAdministrador(id: number) {
        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            throw new Error("Administrador não encontrado");
        }
        
        await administrador.update({ ativo: false });
        return administrador;
    }

    async deleteAdministrador(id: number) {
        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            throw new Error("Administrador não encontrado");
        }
        
        await administrador.destroy();
        return { message: "Administrador removido com sucesso" };
    }

    async verificarPermissao(userId: number, permissao: string): Promise<boolean> {
        const administrador = await this.getAdministradorByUserId(userId);
        
        if (!administrador || !administrador.ativo) {
            return false;
        }
        
        // Super administradores têm todas as permissões
        if (administrador.nivel === 'super') {
            return true;
        }
        
        return administrador.permissoes.includes(permissao);
    }
}
