import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuidadorDto } from './dto/create-cuidador.dto';
import { Cuidador } from './entities/cuidador.entity';

@Injectable()
export class CuidadorService {
  constructor(
    @InjectRepository(Cuidador)
    private readonly cuidadorRepository: Repository<Cuidador>,
  ) {}

  async convertirEnCuidador(createCuidadorDto: CreateCuidadorDto): Promise<Cuidador> {
    const nuevoCuidador = this.cuidadorRepository.create(createCuidadorDto);
    return await this.cuidadorRepository.save(nuevoCuidador);
  }

  async findAll(): Promise<Cuidador[]> {
    return this.cuidadorRepository.find();
  }
}