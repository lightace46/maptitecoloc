import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_password")
export class PasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  password_hash: string;

  @Column()
  userId: number;
  

  @OneToOne(() => UserEntity,(user) => user.password_hash)
  @JoinTable({ 
    name: 'users',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id', referencedColumnName: 'userId' }
})
  user: UserEntity;
}