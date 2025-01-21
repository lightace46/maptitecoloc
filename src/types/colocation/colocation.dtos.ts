import { IsString, IsNumber, Min, IsNotEmpty } from "class-validator";

export class ColocationToCreateDTO {
  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsNumber()
  @Min(1)
  surface: number;

  @IsNumber()
  @Min(1)
  nombreChambres: number;

  @IsString()
  @IsNotEmpty()
  agenceOuProprietaire: string;
}
