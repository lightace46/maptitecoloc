import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { PasswordEntity } from "../../databases/mysql/password.entity";

export class UserPresenter {
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