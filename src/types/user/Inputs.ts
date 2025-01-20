import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
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
    @IsNumber()
    age: UserEntity['age'];

    @Expose()
    @IsString()
    password_hash: PasswordEntity['password_hash'];
  }
  
  
  