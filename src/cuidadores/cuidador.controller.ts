import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { CuidadorService } from './cuidador.service';
import { CreateCuidadorDto } from './dto/create-cuidador.dto';
import { UpdateCuidadorDto } from './dto/update-cuidador.dto';
import { Cuidador } from './entities/cuidador.entity';

@Controller('cuidadores')
export class CuidadorController {
  constructor(private readonly cuidadoresService: CuidadorService) {}

  @Post('convertirme')
  // @Auth()
  create(@Body() createCuidadoreDto: CreateCuidadorDto) {
    Logger.log('entrooo cuidador')
    return this.cuidadoresService.convertirEnCuidador(createCuidadoreDto);
  }


  @Get()
  async findAll(): Promise<Cuidador[]> {
    return this.cuidadoresService.findAll();
  }
}
