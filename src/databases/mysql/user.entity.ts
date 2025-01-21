import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { PasswordEntity } from "./password.entity";
import { ColocationEntity } from "./colocation.entity";

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

  @OneToOne(() => PasswordEntity, (password) => password.user, { cascade: true }) // cascade enabled
  credential: PasswordEntity;

  // Liste des colocations créées par l'utilisateur
  @OneToMany(() => ColocationEntity, (colocation) => colocation.createur)
  colocations: ColocationEntity[];

  // Relation avec la colocation à laquelle l'utilisateur appartient
  @ManyToOne(() => ColocationEntity, (colocation) => colocation.membres)
  colocation: ColocationEntity | null;
}