import { Injectable, Logger, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
// import { Usuario } from 'src/usuarios/entities';
import { LoginUsuarioDto } from './dto/login.dto';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService:UsuarioService
    
  ) { }



  async login(loginUserDto: LoginUsuarioDto) {

    const { password, email } = loginUserDto;

    const usuario = await this.usuarioService.buscarUsuario({
        where: { email },
        select: { email: true, password: true, id: true }
      });


    if (!usuario || !bcrypt.compareSync(password, usuario.password) ) throw new UnauthorizedException("Credenciales inválidas.")


    return  {
      usuario,
      token: this.getJwtToken({ id: usuario.id })
    };
  }


  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);

    return token;

  }


  async checkAuthStatus(usuario: any) {

    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id })
    };


  }

}
