import { Router } from "express";
import { SprintController } from "../controllers/sprintController";

const router = Router();
const sprintController = new SprintController();

/**
 * @swagger
 * /sprints:
 *   post:
 *     summary: Create a new sprint
 *     tags: [Sprints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SprintInput'
 *     responses:
 *       201:
 *         description: Sprint created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
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
router.post("/", sprintController.createSprint);

/**
 * @swagger
 * /sprints:
 *   get:
 *     summary: Get all sprints
 *     tags: [Sprints]
 *     responses:
 *       200:
 *         description: List of sprints returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sprint'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", sprintController.getAllSprints);

/**
 * @swagger
 * /sprints/{id}:
 *   get:
 *     summary: Get sprint by ID
 *     tags: [Sprints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sprint ID
 *     responses:
 *       200:
 *         description: Sprint found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
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
router.get("/:id", sprintController.getSprintById);

/**
 * @swagger
 * /sprints/{id}:
 *   put:
 *     summary: Update sprint
 *     tags: [Sprints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sprint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SprintInput'
 *     responses:
 *       200:
 *         description: Sprint updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
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
router.put("/:id", sprintController.updateSprint);

/**
 * @swagger
 * /sprints/{id}:
 *   delete:
 *     summary: Delete sprint
 *     tags: [Sprints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sprint ID
 *     responses:
 *       200:
 *         description: Sprint deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sprint deleted successfully"
 *       404:
 *         description: Sprint not found
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
router.delete("/:id", sprintController.deleteSprint);

export default router;
