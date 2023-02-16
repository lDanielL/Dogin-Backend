import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/usuarios/entities';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUsuarioDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('status-token')
  // @Auth()
  checkAuthStatus
  (
    /* @GetUser() */ user: Usuario
  ){
    return this.authService.checkAuthStatus(user);
  }

  // @Get('private1')
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard )
  // private1(
  //   @GetUser() user:User
  // ){

  //   return user;
  // }

  // @Get('private')
  // @Auth(ValidRoles.admin)
  // private(
  //   @GetUser() user:User
  // ){

  //   return user;
  // }

}

