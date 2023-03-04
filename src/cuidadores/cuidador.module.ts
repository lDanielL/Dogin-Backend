import { Module } from '@nestjs/common';
import { CuidadorService } from './cuidador.service';
import { CuidadorController } from './cuidador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuidador } from './entities/cuidador.entity';

@Module({
  controllers: [CuidadorController],
  providers: [CuidadorService],
  imports:[
    TypeOrmModule.forFeature([Cuidador])
  ],
  exports:[CuidadorService, TypeOrmModule]
})
export class CuidadorModule {}
