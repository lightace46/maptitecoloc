import { Router } from 'express';

import * as userController from "../../controllers/user.controller";

// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);
routes.delete("/delete/:id", userController.deleteUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.login);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", /* authenticate, userController.getUserProfile */);


export default routes;