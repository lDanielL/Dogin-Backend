import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from './dto/login.dto';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService
  ) {
  }


  async login(loginUsuarioDto: LoginUsuarioDto):Promise<boolean | {}> {

    const { password, email } = loginUsuarioDto;

    const usuario = await this.usuarioService.buscarUsuario({
      where: { email },
      select: { email: true, password: true, id: true }
    });


    if (!usuario) {
      Logger.error(" auth.services => login - Correo no existe.")
      return false;
    }

    
    if (!bcrypt.compareSync(password, usuario.password)) {
      Logger.error(" auth.services => login - Password inválida.")
      return false;
    }


    return {
      // ! lo saque ya que esta mandando el password
      // usuario,
      token: this.getJwtToken({ id: usuario.id })
    };
  }


  getJwtToken(payload: JwtPayload) {

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
