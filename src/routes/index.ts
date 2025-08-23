import { Router } from "express";
import userRoutes from "./userRoutes";
import projectRoutes from "./projectRoutes";
import sprintRoutes from "./sprintRoutes";
import taskRoutes from "./taskRoutes";
import administratorRoutes from "./administratorRoutes";
import administratorExtendedRoutes from "./administratorExtendedRoutes";
import authRoutes from "./authRoutes";
import { authenticate } from "../middlewares/authMiddleware";


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User-related operations
 *   - name: Projects
 *     description: Project-related operations
 *   - name: Sprints
 *     description: Sprint-related operations
 *   - name: Tasks
 *     description: Task-related operations
 *   - name: Administrators
 *     description: Administrator-related operations
 */

const router = Router();

router.use("/users", userRoutes);
router.use("/projects", authenticate, projectRoutes);
router.use("/sprints", authenticate, sprintRoutes);
router.use("/tasks", authenticate, taskRoutes);
router.use("/administrators", authenticate, administratorRoutes);
router.use("/administrators", authenticate, administratorExtendedRoutes);
router.use("/auth", authRoutes);

export default router;
