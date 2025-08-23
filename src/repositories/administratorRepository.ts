import { Administrator } from "../models/Administrator";
import { User } from "../models/User";

export interface UpdateAdministratorData {
    level?: 'super' | 'moderator' | 'support';
    permissions?: string[];
    active?: boolean;
}

export class AdministratorRepository {
    
    async createAdministrator(
        userId: number,
        level: 'super' | 'moderator' | 'support',
        permissions: string[] = [],
        active: boolean = true
    ) {
        return await Administrator.create({
            userId,
            level,
            permissions,
            activationDate: new Date(),
            active
        });
    }
    
    async getAllAdministrators() {
        return await Administrator.findAll({
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministratorById(id: number) {
        return await Administrator.findByPk(id, {
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministratorByUserId(userId: number) {
        return await Administrator.findOne({
            where: { userId },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getAdministratorsByLevel(level: 'super' | 'moderator' | 'support') {
        return await Administrator.findAll({
            where: { level },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async getActiveAdministrators() {
        return await Administrator.findAll({
            where: { active: true },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
    }

    async updateAdministrator(id: number, data: UpdateAdministratorData) {
        const administrator = await Administrator.findByPk(id);
        if (!administrator) {
            throw new Error("Administrator not found");
        }
        
        await administrator.update(data);
        return administrator;
    }

    async activateAdministrator(id: number) {
        const administrator = await Administrator.findByPk(id);
        if (!administrator) {
            throw new Error("Administrator not found");
        }
        
        await administrator.update({ active: true });
        return administrator;
    }

    async deactivateAdministrator(id: number) {
        const administrator = await Administrator.findByPk(id);
        if (!administrator) {
            throw new Error("Administrator not found");
        }
        
        await administrator.update({ active: false });
        return administrator;
    }

    async deleteAdministrator(id: number) {
        const administrator = await Administrator.findByPk(id);
        if (!administrator) {
            throw new Error("Administrator not found");
        }
        
        await administrator.destroy();
        return { message: "Administrator deleted successfully" };
    }

    async verifyPermission(userId: number, permission: string): Promise<boolean> {
        const administrator = await this.getAdministratorByUserId(userId);
        
        if (!administrator || !administrator.active) {
            return false;
        }
        
        // Super administrators have all permissions
        if (administrator.level === 'super') {
            return true;
        }
        
        return administrator.permissions.includes(permission);
    }
}
