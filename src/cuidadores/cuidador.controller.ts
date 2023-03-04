import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuidadorService } from './cuidador.service';
import { CreateCuidadorDto } from './dto/create-cuidador.dto';
import { UpdateCuidadorDto } from './dto/update-cuidador.dto';

@Controller('cuidadores')
export class CuidadorController {
  constructor(private readonly cuidadoresService: CuidadorService) {}

  @Post()
  create(@Body() createCuidadoreDto: CreateCuidadorDto) {
    return this.cuidadoresService.crearCuidador(createCuidadoreDto);
  }

}
