import { Repository } from "typeorm";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";

export class ColocationRepository {
  private colocationDB: Repository<ColocationEntity>;

  constructor() {
    this.colocationDB = connectMySQLDB.getRepository(ColocationEntity);
  }

  // Créer une colocation
  create(colocationData: Partial<ColocationEntity>): ColocationEntity {
    return this.colocationDB.create(colocationData);
  }

  // Sauvegarder une colocation
  async save(colocation: ColocationEntity): Promise<ColocationEntity> {
    return await this.colocationDB.save(colocation);
  }

  // Trouver toutes les colocations d'un utilisateur
  async findByUserId(userId: number): Promise<ColocationEntity[]> {
    return await this.colocationDB.find({
      where: { createur: { id: userId }, isArchived: false },
      relations: ["createur", "membres"],
    });
  }

  // Trouver une colocation par ID
  async findById(colocationId: number): Promise<ColocationEntity | null> {
    return await this.colocationDB.findOne({
      where: { id: colocationId, isArchived: false },
      relations: ["createur", "membres"],
    });
  }

  // Archiver une colocation
  async archive(colocationId: number): Promise<void> {
    await this.colocationDB.update(colocationId, { isArchived: true });
  }
}
