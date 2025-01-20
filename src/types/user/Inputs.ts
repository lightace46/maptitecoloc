import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { PasswordEntity } from "../../databases/mysql/password.entity";

export class userToCreateInput {
    @Expose()
    @IsString()
    nom: UserEntity['nom'];
  
    @Expose()
    @IsString()
    prenom: UserEntity['prenom'];
  
    @Expose()
    @IsString()
    email: UserEntity['email'];
  
    @Expose()
    @IsString()
    age: UserEntity['age'];

    @Expose()
    @IsString()
    password_hash: PasswordEntity['password_hash'];
  }
  
  
  