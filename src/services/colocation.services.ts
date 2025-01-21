import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class ColocationService {
    private colocationRepository = new ColocationRepository();
    private userRepository = new UserRepository();

  // Créer une colocation
  async createColocation(colocationData: Partial<ColocationEntity>, userId: number): Promise<ColocationEntity> {
    // Récupérer l'utilisateur qui crée la colocation
    const user = await this.userRepository.findUserProfilByEmail(userId.toString());
    if (!user) {
      throw new Error("User not found");
    }

    // Créer et sauvegarder la colocation
    const colocation = this.colocationRepository.create({
      ...colocationData,
      createur: user,
    });

    return await this.colocationRepository.save(colocation);
  }

  // Lister les colocations d'un utilisateur
  async listColocations(userId: number): Promise<ColocationEntity[]> {
    return await this.colocationRepository.findByUserId(userId);
  }

  // Obtenir les détails d'une colocation
  async getColocationDetails(colocationId: number): Promise<ColocationEntity | null> {
    return await this.colocationRepository.findById(colocationId);
  }

  // Archiver une colocation
  async archiveColocation(colocationId: number): Promise<void> {
    await this.colocationRepository.archive(colocationId);
  }
}
