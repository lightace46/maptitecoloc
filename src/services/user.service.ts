import { PasswordEntity } from "../databases/mysql/password.entity";
import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY

    // ON HASH LE MOT DE PASSE
    const credential_hash = await bcrypt.hash(userToCreate.password, 10);

    const credential = new PasswordEntity();
    credential.password_hash = credential_hash;
    
    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({...userToCreate, credential });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async loginUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserProfilByEmail(email);
    console.log('user found');
    
    if (!user) {
      throw new Error('pas d\'utilisateur')
    }

    const isPasswordValid = await bcrypt.compare(password, user.credential.password_hash);

    if (!isPasswordValid) {
      throw new Error('password problem')
    } 
    return user;
  }

 async deleteUser(userId: number): Promise<boolean> {
    const userDeleted = await this.userRepository.delete(userId);
    return userDeleted.affected === 1;
  }

  async refreshToken(token: string): Promise<string> {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const newToken = jwt.sign({ userId: decodedToken.userId }, JWT_SECRET, { expiresIn: '1h' });

    return newToken;
  }

  async getUserById(userId: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserProfilById(userId);
    return user || null;
  }
  
}