import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { userToCreateInput } from "../types/user/Inputs";
import { PasswordEntity } from "../databases/mysql/password.entity";


export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    console.log(user);
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
  

  async save(user: UserEntity): Promise<UserEntity> {
    console.log(user);
    return await this.userDB.save(user);
  }

  async delete(userId: number): Promise<DeleteResult> {
    const user = await this.userDB.delete(userId);
    console.log(user);
    return user;
  }
}