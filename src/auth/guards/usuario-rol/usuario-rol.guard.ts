import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators';
import { Usuario } from '../../../usuarios/entities/usuario.entity';

@Injectable()
export class UsuarioRolGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    //* chatgpt recomendo esto, probar si funciona todo
    // @InjectRepository(Usuario)
    // private readonly userRepository: Repository<Usuario>,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();

    const usuario = req.user  as Usuario;

    if (!usuario) {
      Logger.error('UsuarioRolGuard => CanActive: Usuario no encontrado.')
      // throw new BadRequestException('Usuario no encontrado');
      return false;
    }

    for (const role of usuario.roles) {
      if (validRoles.includes(role)) return true;
    }

    Logger.error(`UsuarioRolGuard => CanActive: ${usuario.nombres} ${usuario.apellidos} no tiene un rol válido [${validRoles}]`);
    // throw new ForbiddenException(`${usuario.nombres} ${usuario.apellidos} no tiene un rol válido [${validRoles}]`);
    return false;
  }

}
