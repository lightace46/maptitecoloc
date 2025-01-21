import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("colocations")
export class ColocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  lieu: string;

  @Column({ type: "float" })
  surface: number; // Surface en m²

  @Column()
  nombreChambres: number;

  @Column({ length: 50 })
  agenceOuProprietaire: string;

  @Column({ default: false }) // Pour archiver une colocation sans la supprimer réellement
  isArchived: boolean;

  // Relation avec les utilisateurs (le créateur)
  @ManyToOne(() => UserEntity, (user) => user.colocations)
  createur: UserEntity;

  // Liste des membres de la colocation
  @OneToMany(() => UserEntity, (user) => user.colocation)
  membres: UserEntity[];
}
