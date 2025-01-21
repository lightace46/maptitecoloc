import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { userToCreateInput } from "../types/user/Inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = new UserEntity();
    newUser.nom = user.nom;
    newUser.prenom = user.prenom;
    newUser.age = user.age;
    newUser.email = user.email;
    newUser.credential = user.credential;
    
    return newUser;
  }

  async findUserProfilByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userDB.findOne({where: {email}, relations: ['credential']});

    return user || null;
  }

  async findUserProfilById(userId: number): Promise<UserEntity | null> {
    const user = await this.userDB.findOne({where: {id: userId}, relations: ['credential']});
    return user || null;
  }
  
  async save(user: UserEntity): Promise<UserEntity> {
    return await this.userDB.save(user);
  }

  async delete(userId: number): Promise<DeleteResult> {
    const user = await this.userDB.delete({id: userId});
    return user;
  }

  //refresh
  async refreshTokens(userId: number, refreshToken: string): Promise<UserEntity | null> {
    const user = await this.userDB.findOne({where: {id: userId}, relations: ['credential']});
    return user || null;
  }
}