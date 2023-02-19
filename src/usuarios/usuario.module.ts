import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService,JwtService],
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(()=> AuthModule)
  ],
  exports:[UsuarioService, TypeOrmModule]
})
export class UsuarioModule { }
