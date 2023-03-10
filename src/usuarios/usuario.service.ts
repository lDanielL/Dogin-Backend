import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PaginacionDto } from '../common/dtos/paginacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';


@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService

  ) { }




  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...usuarioDatos } = createUsuarioDto;
      const usuario = this.usuarioRepository.create({
        ...usuarioDatos,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.password;

      Logger.verbose(`Usuario Creado: ${usuario.email}.`)

      const token = this.getJwtToken({ id: usuario.id })

      return {
        ...usuario,
        ok: true,
        token
      }
    } catch (error) {

      this.manejoErroresDB(error);
    }
  }


  getJwtToken(payload: JwtPayload): string {

    const token = this.jwtService.sign(payload);

    return token;

  }

  async todosLosUsuarios({ limit = 10, offset = 0 }: PaginacionDto): Promise<Usuario[]> {

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

  async buscarPorEmail(email: string): Promise<Usuario> {

    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (usuario) {
      Logger.warn(`Ya se encuentra registrado un usuario con el email: ${email}`);
    }

    return usuario;
  }

  private manejoErroresDB(error: any): never {

    if (error.code === '23505') {

      Logger.error(error.detail);
      throw new BadRequestException(error.detail);
    }

    Logger.error(error.detail);
    throw new InternalServerErrorException("Favor contactarse con el administrador.");

  }
}