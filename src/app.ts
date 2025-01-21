import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import { handleValidationErrors } from "./middlewares/validation";
import colocationRoutes from "./routes/colocation/colocation.routes";


const app = express();

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors());         // Active CORS pour les requêtes cross-origin
// app.use(helmet());       // Sécurise les headers HTTP

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});

app.use("/api/users", userRoutes); // Routes pour les utilisateurs
app.use("/api/colocations", colocationRoutes); // Routes pour les colocations

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use(handleValidationErrors);

export default app;