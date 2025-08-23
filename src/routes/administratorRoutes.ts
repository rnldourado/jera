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
 * /administradores:
 *   get:
 *     summary: Obter todos os administradores
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de administradores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrador'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", administratorController.getAllAdministrators);

/**
 * @swagger
 * /administradores/permissoes:
 *   get:
 *     summary: Obter lista de permissões disponíveis
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de permissões disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissoes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 total:
 *                   type: integer
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/permissions", administratorController.getAvailablePermissions);

/**
 * @swagger
 * /administradores/ativos:
 *   get:
 *     summary: Obter administradores ativos
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de administradores ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrador'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/active", administratorController.getActiveAdministrators);

/**
 * @swagger
 * /administradores/{id}:
 *   get:
 *     summary: Obter administrador por ID
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", administratorController.getAdministratorById);

/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     summary: Atualizar administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdministradorUpdateInput'
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", administratorController.updateAdministrator);

/**
 * @swagger
 * /administradores/{id}/ativar:
 *   patch:
 *     summary: Ativar administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador ativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrador ativado com sucesso"
 *                 administrador:
 *                   $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/activate", administratorController.activateAdministrator);

/**
 * @swagger
 * /administradores/{id}/desativar:
 *   patch:
 *     summary: Desativar administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrador desativado com sucesso"
 *                 administrador:
 *                   $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/deactivate", administratorController.deactivateAdministrator);

/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     summary: Deletar administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Administrador removido com sucesso"
 *       404:
 *         description: Administrador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", administratorController.deleteAdministrator);

export default router;
