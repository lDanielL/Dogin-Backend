import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/usuarios/entities';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUsuario } from './decorators/get-usuario.decorator';
import { LoginUsuarioDto } from './dto/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  loginUsuario(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDto);
  }

  @Get('statusToken')
  @Auth()
  checkAuthStatus(
    @GetUsuario() usuario: Usuario
  ) {
    return this.authService.checkAuthStatus(usuario);
  }

}

