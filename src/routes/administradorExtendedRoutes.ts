import { Router } from "express";
import { AdministradorController } from "../controllers/administradorController";

const router = Router();
const administradorController = new AdministradorController();

/**
 * @swagger
 * /administradores/usuario/{userId}:
 *   get:
 *     summary: Obter administrador por ID do usuário
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Este usuário não é um administrador
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
router.get("/usuario/:userId", (req, res) => {
    administradorController.getAdministradorByUserId(req, res);
});

/**
 * @swagger
 * /administradores/nivel/{nivel}:
 *   get:
 *     summary: Obter administradores por nível
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: nivel
 *         required: true
 *         schema:
 *           type: string
 *           enum: [super, moderador, suporte]
 *         description: Nível do administrador
 *     responses:
 *       200:
 *         description: Lista de administradores do nível especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Nível inválido
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
router.get("/nivel/:nivel", (req, res) => {
    administradorController.getAdministradoresByNivel(req, res);
});

/**
 * @swagger
 * /administradores/verificar-permissao:
 *   post:
 *     summary: Verificar se um usuário tem uma permissão específica
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, permissao]
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário
 *                 example: 1
 *               permissao:
 *                 type: string
 *                 description: Nome da permissão a verificar
 *                 example: "gerenciar_usuarios"
 *     responses:
 *       200:
 *         description: Resultado da verificação de permissão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 permissao:
 *                   type: string
 *                 temPermissao:
 *                   type: boolean
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
router.post("/verificar-permissao", (req, res) => {
    administradorController.verificarPermissao(req, res);
});

export default router;
