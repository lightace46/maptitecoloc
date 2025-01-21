import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_password")
export class PasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password_hash: string;
  
  @OneToOne(() => UserEntity, (user) => user.credential, { onDelete: "CASCADE" }) // Cascade delete enabled
  @JoinColumn({name: "user_id"})
  user: UserEntity;
}