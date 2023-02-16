import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }

  @Get()
  todosLosUsuarios(@Query() paginacionDto:PaginacionDto) {
    return this.usuarioService.todosLosUsuarios(paginacionDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

