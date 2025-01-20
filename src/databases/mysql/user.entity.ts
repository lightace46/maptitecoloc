import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { PasswordEntity } from "./password.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nom: string;

  @Column({ length: 50 })
  prenom: string;

  @Column({ unique: true })
  email: string;
  
  @Column({ default: 18 }) 
  age: number;


  @OneToOne(() => PasswordEntity, (user_password) => user_password.password_hash, { cascade: true })
  password_hash: PasswordEntity;
}

