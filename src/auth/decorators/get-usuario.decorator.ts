import { createParamDecorator, ExecutionContext, Logger, InternalServerErrorException } from '@nestjs/common';

export const GetUsuario = createParamDecorator(
    (data, ctx:ExecutionContext)=>{

        const req = ctx.switchToHttp().getRequest();
        const usuario = req.user;

        if (!usuario) {
            Logger.error('get-usuario.decorator => GetUsuario: Usuario no encontrado');
            throw new InternalServerErrorException("Usuario no encontrado");
        }

        return usuario;
    }
);