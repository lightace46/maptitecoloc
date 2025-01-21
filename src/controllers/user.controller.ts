import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import jwt from 'jsonwebtoken';

const userService = new UserService();
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
   const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

   const dtoErrors = await validate(userToCreateDTO);
   if (dtoErrors.length > 0) {
     console.log(dtoErrors);
     throw new Error("Invalid fields");
   }
    
    const user = await userService.registerUser(userToCreateDTO);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    throw error;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('teest')
    const user = await userService.loginUser(email, password);

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1m' });

    res.status(200).json({ token });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error logging in user', error: errorMessage });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    const userDeleted = await userService.deleteUser(userId);

    if (!userDeleted) {
      res.status(404).json({ message: `User with ID ${req.params.id} not found` });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error deleting user', error: errorMessage });
  }  
};

//refresh
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const newToken = jwt.sign({ userId: decodedToken.userId }, JWT_SECRET, { expiresIn: '1m' });

    res.status(200).json({ token: newToken });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error refreshing token', error: errorMessage });
  }
};

export const getUserProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // TypeScript ne déclenchera plus d'erreur ici
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log(userId);

    const user = await userService.getUserById(userId);
    console.log(user);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Error retrieving user profile", error: errorMessage });
  }
};
