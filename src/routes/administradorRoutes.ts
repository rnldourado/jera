import { Router } from "express";
import { AdministradorController } from "../controllers/administradorController";

const router = Router();
const administradorController = new AdministradorController();

/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Criar um novo administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdministradorInput'
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
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
router.post("/", administradorController.createAdministrador);

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
router.get("/", administradorController.getAllAdministradores);

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
router.get("/permissoes", administradorController.getPermissoesDisponiveis);

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
router.get("/ativos", administradorController.getAdministradoresAtivos);

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
router.get("/:id", administradorController.getAdministradorById);

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
router.put("/:id", administradorController.updateAdministrador);

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
router.patch("/:id/ativar", administradorController.ativarAdministrador);

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
router.patch("/:id/desativar", administradorController.desativarAdministrador);

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
router.delete("/:id", administradorController.deleteAdministrador);

export default router;
