import { Request, Response } from "express";
import { AdministratorService, CreateAdministratorDTO, UpdateAdministratorDTO } from "../services/administratorService";

export class AdministratorController {
    private administratorService: AdministratorService;

    constructor() {
        this.administratorService = new AdministratorService();
    }

    // POST /administrators - Create administrator
    createAdministrator = async (req: Request, res: Response) => {
        try {
            const data: CreateAdministratorDTO = req.body;
            const administrator = await this.administratorService.createAdministrator(data);
            res.status(201).json(administrator);
        } catch (error: any) {
            res.status(400).json({
                message: "Error creating administrator",
                error: error.message
            });
        }
    };

    // GET /administrators - Get all administrators
    getAllAdministrators = async (req: Request, res: Response) => {
        try {
            const administrators = await this.administratorService.getAllAdministrators();
            res.json(administrators);
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching administrators",
                error: error.message
            });
        }
    };

    // GET /administrators/:id - Get administrator by ID
    getAdministratorById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrator = await this.administratorService.getAdministratorById(id);
            res.json(administrator);
        } catch (error: any) {
            if (error.message === "Administrator not found" || error.message === "Invalid administrator ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching administrator",
                    error: error.message
                });
            }
        }
    };

    // GET /administrators/user/:userId - Get administrator by user ID
    getAdministratorByUserId = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const administrator = await this.administratorService.getAdministratorByUserId(userId);
            
            if (!administrator) {
                return res.status(404).json({ message: "This user is not an administrator" });
            }
            
            res.json(administrator);
        } catch (error: any) {
            if (error.message === "Invalid user ID") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error fetching administrator",
                    error: error.message
                });
            }
        }
    };

    // GET /administrators/level/:level - Get administrators by level
    getAdministratorsByLevel = async (req: Request, res: Response) => {
        try {
            const level = req.params.level as 'super' | 'moderator' | 'support';
            
            if (!['super', 'moderator', 'support'].includes(level)) {
                return res.status(400).json({ message: "Invalid level. Use: super, moderator or support" });
            }
            
            const administrators = await this.administratorService.getAdministratorsByLevel(level);
            res.json(administrators);
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching administrators",
                error: error.message
            });
        }
    };

    // GET /administrators/active - Get active administrators
    getActiveAdministrators = async (req: Request, res: Response) => {
        try {
            const administrators = await this.administratorService.getActiveAdministrators();
            res.json(administrators);
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching active administrators",
                error: error.message
            });
        }
    };

    // PUT /administrators/:id - Update administrator
    updateAdministrator = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data: UpdateAdministratorDTO = req.body;
            const administrator = await this.administratorService.updateAdministrator(id, data);
            res.json(administrator);
        } catch (error: any) {
            if (error.message === "Administrator not found" || error.message === "Invalid administrator ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({
                    message: "Error updating administrator",
                    error: error.message
                });
            }
        }
    };

    // PATCH /administrators/:id/activate - Activate administrator
    activateAdministrator = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrator = await this.administratorService.activateAdministrator(id);
            res.json({
                message: "Administrator activated successfully",
                administrator
            });
        } catch (error: any) {
            if (error.message === "Administrator not found" || error.message === "Invalid administrator ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error activating administrator",
                    error: error.message
                });
            }
        }
    };

    // PATCH /administrators/:id/deactivate - Deactivate administrator
    deactivateAdministrator = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const administrator = await this.administratorService.deactivateAdministrator(id);
            res.json({
                message: "Administrator deactivated successfully",
                administrator
            });
        } catch (error: any) {
            if (error.message === "Administrator not found" || error.message === "Invalid administrator ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error deactivating administrator",
                    error: error.message
                });
            }
        }
    };

    // DELETE /administrators/:id - Delete administrator
    deleteAdministrator = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.administratorService.deleteAdministrator(id);
            res.json(result);
        } catch (error: any) {
            if (error.message === "Administrator not found" || error.message === "Invalid administrator ID") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: "Error deleting administrator",
                    error: error.message
                });
            }
        }
    };

    // POST /administrators/check-permission - Check user permission
    checkPermission = async (req: Request, res: Response) => {
        try {
            const { userId, permission } = req.body;
            
            if (!userId || !permission) {
                return res.status(400).json({ message: "userId and permission are required" });
            }
            
            const hasPermission = await this.administratorService.verifyPermission(userId, permission);
            res.json({
                userId,
                permission,
                hasPermission
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Error checking permission",
                error: error.message
            });
        }
    };

    // GET /administrators/permissions - Get available permissions list
    getAvailablePermissions = async (req: Request, res: Response) => {
        try {
            const permissions = await this.administratorService.getAvailablePermissions();
            res.json({
                permissions,
                total: permissions.length
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching available permissions",
                error: error.message
            });
        }
    };
}
