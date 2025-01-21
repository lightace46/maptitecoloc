import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserToCreateDTO } from "../types/user/dtos";
import { userToCreateInput } from "../types/user/Inputs";
import { PasswordEntity } from "../databases/mysql/password.entity";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = this.userDB.create({
      ...user,
      password_hash: { hash: user.password_hash } as DeepPartial<PasswordEntity>
    });
    return newUser;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }

  async delete(userId: number): Promise<DeleteResult> {
    const user = await this.userDB.delete(userId);
    console.log(user);
    return user;
  }
}