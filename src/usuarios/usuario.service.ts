import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto';
import { PaginacionDto } from '../common/dtos/paginacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

  ) { }




  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...usuarioDatos } = createUsuarioDto;
      const usuario = this.usuarioRepository.create({
        ...usuarioDatos,
        password: bcrypt.hashSync(password,10),
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.password;

      Logger.verbose(`Usuario Creado: ${usuario.email}.`)
      return {
        ...usuario,
      }
    } catch (error) {
      this.manejoErroresDB(error);
    }
  }

  async todosLosUsuarios({ limit = 10, offset = 0 }: PaginacionDto) {

    const usuarios = await this.usuarioRepository.find({
      take: limit,
      skip: offset,
    })

    return usuarios;

  }

  async buscarUsuario(buscar: {}): Promise<Usuario> {

    try {
      const usuario = await this.usuarioRepository.findOne(buscar)

      return usuario;

    } catch (error) {
      Logger.error(`usuario.service => buscarUsuario: Error al obtener usuario, error:${error} `)
    }
  }


  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} `;
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }



  private manejoErroresDB(error: any): never {

    if (error.code === '23505') {

      Logger.error(error.detail);
      throw new BadRequestException(error.detail);
    }

    Logger.error(error);
    throw new InternalServerErrorException("Favor contactarse con el administrador");

  }
}