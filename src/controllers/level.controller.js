import { validateLevel } from "../schemas/level.schema.js";
import { LevelService } from "../services/level.service.js";



export class levelController{
    static async createLevel(req, res){
        const result = validateLevel(req.body);

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const response = await LevelService.createLevel(result.data);
    
        if (!response) {
          return res.status(409).json({
            error: {
              message: "An error has ocurred."
            }
          })
        }
        return res.status(201).json({ data: response });
    }

    static async getAllLevels(req, res) {
        try {
          const allLevels = await LevelService.getAllLevels();
    
          if (allLevels) {
            return res.status(200).json(allLevels);
          } else {
            return res.status(500).json({ error: "Error getting levels" });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }

    static async getOneLevel(req, res) {

        try {
          const {id} = req.params;
    
          const response = await LevelService.getOneLevel(id);
    
          if (response) {
            return res.status(200).json({ data: response });
          } else {
            return res.status(404).json({ error: "Failed to get level. It may not exist." });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }

      static async deleteLevel(req, res) {

        try {
          const {id} = req.params; 
    
          const deleted = await LevelService.deleteLevel(id);
    
          if (deleted) {
            return res.status(200).json({ message: "Level successfully removed" });
          } else {
            return res.status(404).json({ error: "Failed to delete level. It may not exist." });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
}