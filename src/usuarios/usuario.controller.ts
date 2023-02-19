import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Auth } from 'src/auth/decorators';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }

  @Get()
  @Auth()
  todosLosUsuarios(
    @Query() paginacionDto:PaginacionDto,
    ) {
    return this.usuarioService.todosLosUsuarios(paginacionDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

