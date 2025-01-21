import { Router } from "express";
import * as colocationController from "../../controllers/colocation.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const routes = Router();

routes.post("/create", authenticateToken, colocationController.createColocation);
routes.get("/", authenticateToken, colocationController.listColocations);
routes.get("/:id", authenticateToken, colocationController.getColocationDetails);
routes.delete("/:id", authenticateToken, colocationController.archiveColocation);

export default routes;
