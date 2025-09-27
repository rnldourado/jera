import { Router } from "express";
import { AdministratorController } from "../controllers/administratorController";

const router = Router();
const administratorController = new AdministratorController();

/**
 * @swagger
 * /administrators/user/{userId}:
 *   get:
 *     summary: Get administrator by user ID
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Administrator found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrator'
 *       404:
 *         description: This user is not an administrator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/user/:userId", (req, res) => {
    administratorController.getAdministratorByUserId(req, res);
});

/**
 * @swagger
 * /administrators/level/{level}:
 *   get:
 *     summary: Get administrators by level
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *           enum: [super, moderador, suporte]
 *         description: Administrator level
 *     responses:
 *       200:
 *         description: List of administrators of the specified level
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrator'
 *       400:
 *         description: Invalid level
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/level/:nivel", (req, res) => {
    administratorController.getAdministratorsByLevel(req, res);
});

/**
 * @swagger
 * /administrators/verify-permission:
 *   post:
 *     summary: Verify if a user has a specific permission
 *     tags: [Administrators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, permission]
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User ID
 *                 example: 1
 *               permission:
 *                 type: string
 *                 description: Permission name to verify
 *                 example: "manage_users"
 *     responses:
 *       200:
 *         description: Permission verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 permission:
 *                   type: string
 *                 hasPermission:
 *                   type: boolean
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/verify-permission", (req, res) => {
    administratorController.checkPermission(req, res);
});

export default router;
