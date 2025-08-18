import { Router } from "express";
import userRoutes from "./userRoutes";
import projectRoutes from "./projectRoutes";
import sprintRoutes from "./sprintRoutes";
import taskRoutes from "./taskRoutes";
import administratorRoutes from "./administratorRoutes";
import administratorExtendedRoutes from "./administratorExtendedRoutes";

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

// Register all routes
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/sprints", sprintRoutes);
router.use("/tasks", taskRoutes);
router.use("/administrators", administratorRoutes);
router.use("/administrators", administratorExtendedRoutes);

export default router;
