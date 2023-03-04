import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Auth } from 'src/auth/decorators';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('registrarse')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }

  @Get()
  @Auth()
  todosLosUsuarios(
    @Query() paginacionDto: PaginacionDto,
  ) {
    return this.usuarioService.todosLosUsuarios(paginacionDto);
  }

  @Get('buscarPorEmail/:email')
  buscarPorEmail(@Param('email') email: string) {
    return this.usuarioService.buscarPorEmail(email);
  }

}

