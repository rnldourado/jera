import { AdministratorRepository, UpdateAdministratorData } from "../repositories/administratorRepository";

export interface CreateAdministratorDTO {
    userId: number;
    level: 'super' | 'moderator' | 'support';
    permissions?: string[];
    active?: boolean;
}

export interface UpdateAdministratorDTO {
    level?: 'super' | 'moderator' | 'support';
    permissions?: string[];
    active?: boolean;
}

// Available permissions constants
export const AVAILABLE_PERMISSIONS = [
    'manage_users',
    'manage_projects',
    'manage_sprints',
    'manage_tasks',
    'manage_administrators',
    'view_reports',
    'manage_system',
    'approve_projects',
    'delete_data'
] as const;

export class AdministratorService {
    private administratorRepository: AdministratorRepository;

    constructor() {
        this.administratorRepository = new AdministratorRepository();
    }

    async createAdministrator(data: CreateAdministratorDTO) {
        try {
            // Business validation
            if (!data.userId || data.userId <= 0) {
                throw new Error("User ID is required and must be valid");
            }

            // Check if user is already an administrator
            const existingAdministrator = await this.administratorRepository.getAdministratorByUserId(data.userId);
            if (existingAdministrator) {
                throw new Error("This user is already an administrator");
            }

            // Validate permissions if provided
            if (data.permissions && data.permissions.length > 0) {
                const invalidPermissions = data.permissions.filter(
                    permission => !AVAILABLE_PERMISSIONS.includes(permission as any)
                );
                if (invalidPermissions.length > 0) {
                    throw new Error(`Invalid permissions: ${invalidPermissions.join(', ')}`);
                }
            }

            // Set default permissions based on level
            let defaultPermissions = data.permissions || [];
            if (!data.permissions || data.permissions.length === 0) {
                switch (data.level) {
                    case 'super':
                        defaultPermissions = [...AVAILABLE_PERMISSIONS];
                        break;
                    case 'moderator':
                        defaultPermissions = ['manage_users', 'manage_projects', 'manage_sprints', 'view_reports'];
                        break;
                    case 'support':
                        defaultPermissions = ['view_reports'];
                        break;
                }
            }

            const administrator = await this.administratorRepository.createAdministrator(
                data.userId,
                data.level,
                defaultPermissions,
                data.active !== undefined ? data.active : true
            );

            return administrator;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdministrators() {
        try {
            return await this.administratorRepository.getAllAdministrators();
        } catch (error) {
            throw error;
        }
    }

    async getAdministratorById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid administrator ID");
            }

            const administrator = await this.administratorRepository.getAdministratorById(id);
            if (!administrator) {
                throw new Error("Administrator not found");
            }

            return administrator;
        } catch (error) {
            throw error;
        }
    }

    async getAdministratorByUserId(userId: number) {
        try {
            if (!userId || userId <= 0) {
                throw new Error("Invalid user ID");
            }

            return await this.administratorRepository.getAdministratorByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAdministratorsByLevel(level: 'super' | 'moderator' | 'support') {
        try {
            return await this.administratorRepository.getAdministratorsByLevel(level);
        } catch (error) {
            throw error;
        }
    }

    async getActiveAdministrators() {
        try {
            return await this.administratorRepository.getActiveAdministrators();
        } catch (error) {
            throw error;
        }
    }

    async updateAdministrator(id: number, data: UpdateAdministratorDTO) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid administrator ID");
            }

            // Validate permissions if provided
            if (data.permissions && data.permissions.length > 0) {
                const invalidPermissions = data.permissions.filter(
                    permission => !AVAILABLE_PERMISSIONS.includes(permission as any)
                );
                if (invalidPermissions.length > 0) {
                    throw new Error(`Invalid permissions: ${invalidPermissions.join(', ')}`);
                }
            }

            const updatedAdministrator = await this.administratorRepository.updateAdministrator(id, data);
            return updatedAdministrator;
        } catch (error) {
            throw error;
        }
    }

    async activateAdministrator(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid administrator ID");
            }

            return await this.administratorRepository.activateAdministrator(id);
        } catch (error) {
            throw error;
        }
    }

    async deactivateAdministrator(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid administrator ID");
            }

            return await this.administratorRepository.deactivateAdministrator(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteAdministrator(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("Invalid administrator ID");
            }

            const result = await this.administratorRepository.deleteAdministrator(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async verifyPermission(userId: number, permission: string): Promise<boolean> {
        try {
            if (!userId || userId <= 0) {
                return false;
            }

            return await this.administratorRepository.verifyPermission(userId, permission);
        } catch (error) {
            return false;
        }
    }

    async getAvailablePermissions() {
        return AVAILABLE_PERMISSIONS;
    }
}

export default AdministratorService;
