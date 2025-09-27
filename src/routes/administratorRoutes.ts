import { Router } from "express";
import { AdministratorController } from "../controllers/administratorController";

const router = Router();
const administratorController = new AdministratorController();

/**
 * @swagger
 * /administrators:
 *   post:
 *     summary: Create a new administrator
 *     tags: [Administrators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdministratorInput'
 *     responses:
 *       201:
 *         description: Administrator created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrator'
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
router.post("/", administratorController.createAdministrator);

/**
 * @swagger
 * /administrators:
 *   get:
 *     summary: Get all administrators
 *     tags: [Administrators]
 *     responses:
 *       200:
 *         description: List of administrators returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrator'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", administratorController.getAllAdministrators);

/**
 * @swagger
 * /administrators/permissions:
 *   get:
 *     summary: Get list of available permissions
 *     tags: [Administrators]
 *     responses:
 *       200:
 *         description: List of available permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 total:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/permissions", administratorController.getAvailablePermissions);

/**
 * @swagger
 * /administrators/active:
 *   get:
 *     summary: Get active administrators
 *     tags: [Administrators]
 *     responses:
 *       200:
 *         description: List of active administrators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrator'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/active", administratorController.getActiveAdministrators);

/**
 * @swagger
 * /administrators/{id}:
 *   get:
 *     summary: Get administrator by ID
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrator'
 *       404:
 *         description: Administrator not found
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
router.get("/:id", administratorController.getAdministratorById);

/**
 * @swagger
 * /administrators/{id}:
 *   put:
 *     summary: Update administrator
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdministratorUpdateInput'
 *     responses:
 *       200:
 *         description: Administrator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrator'
 *       404:
 *         description: Administrator not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
router.put("/:id", administratorController.updateAdministrator);

/**
 * @swagger
 * /administrators/{id}/activate:
 *   patch:
 *     summary: Activate administrator
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrator activated successfully"
 *                 administrator:
 *                   $ref: '#/components/schemas/Administrator'
 *       404:
 *         description: Administrator not found
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
router.patch("/:id/activate", administratorController.activateAdministrator);

/**
 * @swagger
 * /administrators/{id}/deactivate:
 *   patch:
 *     summary: Deactivate administrator
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrator deactivated successfully"
 *                 administrator:
 *                   $ref: '#/components/schemas/Administrator'
 *       404:
 *         description: Administrator not found
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
router.patch("/:id/deactivate", administratorController.deactivateAdministrator);

/**
 * @swagger
 * /administrators/{id}:
 *   delete:
 *     summary: Delete administrator
 *     tags: [Administrators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrator removed successfully"
 *       404:
 *         description: Administrator not found
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
router.delete("/:id", administratorController.deleteAdministrator);

export default router;
