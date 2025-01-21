import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.services";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationToCreateDTO } from "../types/colocation/colocation.dtos";

const colocationService = new ColocationService();

export const createColocation = async (req: any, res: Response): Promise<void> => {
    try {
        // 1. Valider les données entrantes
        const colocationDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });
        const errors = await validate(colocationDTO);
    
        if (errors.length > 0) {
          res.status(400).json({ message: "Invalid fields", errors });
          return;
        }
    
        // 2. Récupérer l'utilisateur connecté
        const userId = req.userId;
        if (!userId) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
    
        // 3. Appeler le service pour créer la colocation
        const colocation = await colocationService.createColocation(colocationDTO, userId);
    
        // 4. Retourner la colocation créée
        res.status(201).json(colocation);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "Error creating colocation", error: errorMessage });
      }
};

export const listColocations = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const colocations = await colocationService.listColocations(userId);
    res.status(200).json(colocations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colocations", error });
  }
};

export const getColocationDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      // Récupérer l'ID de la colocation depuis les paramètres
      const colocationId = parseInt(req.params.id, 10);
  
      // Vérifier si l'ID est un nombre valide
      if (isNaN(colocationId)) {
        res.status(400).json({ message: "Invalid colocation ID" });
        return;
      }
  
      // Récupérer les détails de la colocation depuis le service
      const colocation = await colocationService.getColocationDetails(colocationId);
  
      // Si la colocation n'existe pas, renvoyer une erreur 404
      if (!colocation) {
        res.status(404).json({ message: "Colocation not found" });
        return;
      }
  
      // Retourner les détails de la colocation
      res.status(200).json(colocation);
    } catch (error) {
      // Gérer les erreurs et renvoyer une réponse appropriée
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Error fetching colocation details", error: errorMessage });
    }
  };
  

export const archiveColocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const colocationId = parseInt(req.params.id, 10);
    await colocationService.archiveColocation(colocationId);
    res.status(200).json({ message: "Colocation archived successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error archiving colocation", error });
  }
};
