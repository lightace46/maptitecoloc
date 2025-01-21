import { Expose } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { PasswordEntity } from "../../databases/mysql/password.entity";
import { IsNumber, IsString, isString } from "class-validator";

export class UserToCreateDTO {
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
  password: PasswordEntity['password_hash'];
}

export class UserPasswordToCreateDTO {
  @Expose()
  @IsString()
  password_hash: PasswordEntity['password_hash'];

  @Expose()
  @IsNumber()
  userId: UserEntity['id']
}

export class UserDeleteDTO {
  @Expose()
  @IsNumber()
  userId: UserEntity['id'];
}
