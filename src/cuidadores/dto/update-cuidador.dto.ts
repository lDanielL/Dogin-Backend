import { PartialType } from '@nestjs/swagger';
import { CreateCuidadorDto } from './create-cuidador.dto';

export class UpdateCuidadorDto extends PartialType(CreateCuidadorDto) {}
