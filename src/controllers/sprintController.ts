import { Request, Response } from "express";
import { SprintService, CreateSprintDTO, UpdateSprintDTO } from "../services/sprintService";

export class SprintController {
  private sprintService: SprintService;

  constructor() {
    this.sprintService = new SprintService();
  }

  createSprint = async (req: Request, res: Response) => {
    try {
      const data: CreateSprintDTO = req.body;
      const sprint = await this.sprintService.createSprint(data);
      res.status(201).json(sprint);
    } catch (error: any) {
      res.status(400).json({ 
        message: "Error creating sprint", 
        error: error.message 
      });
    }
  };

  getAllSprints = async (req: Request, res: Response) => {
    try {
      const sprints = await this.sprintService.getAllSprints();
      res.json(sprints);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching sprints", 
        error: error.message 
      });
    }
  };

  getSprintById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const sprint = await this.sprintService.getSprintById(id);
      
      if (!sprint) {
        res.status(404).json({ message: "Sprint not found" });
        return;
      }
      
      res.json(sprint);
    } catch (error: any) {
      if (error.message === "Sprint not found" || error.message === "Invalid sprint ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({
          message: "Error fetching sprint", 
          error: error.message 
        });
      }
    }
  };

  updateSprint = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateSprintDTO = req.body;
      const sprint = await this.sprintService.updateSprint(id, data);
      res.json(sprint);
    } catch (error: any) {
      if (error.message === "Sprint not found" || error.message === "Invalid sprint ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ 
          message: "Error updating sprint", 
          error: error.message 
        });
      }
    }
  };

  deleteSprint = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.sprintService.deleteSprint(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === "Sprint not found" || error.message === "Invalid sprint ID") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: "Error deleting sprint", 
          error: error.message 
        });
      }
    }
  };
}
