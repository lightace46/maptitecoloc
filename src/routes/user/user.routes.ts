import { Router } from 'express';

import * as userController from "../../controllers/user.controller";
import { authenticateToken } from '../../middlewares/authMiddleware';

// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);
routes.delete("/delete/:id", userController.deleteUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.login);

//refresh
routes.post("/refresh", userController.refreshToken);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authenticateToken, userController.getUserProfile );


export default routes;