import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { UsuarioService } from '../../usuarios/usuario.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService,
        private readonly usuarioService: UsuarioService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {

        const { id } = payload;

        const usuario = await this.usuarioService.buscarUsuario(
            {
                where: { id: +id },
            }
        );

        if (!usuario) {
            Logger.error(`JwtStrategy => validate: ${usuario.email} no autorizado.`);
            throw new UnauthorizedException("Token inválido.");
        }
        if (!usuario.estado) {
            Logger.error(`JwtStrategy => validate: ${usuario.email} usuario inactivo.`);
            throw new UnauthorizedException("Usuario inactivo.");
        }

        Logger.log(`JwtStrategy => validate:  ${usuario.email} autorizado.`)
        return usuario;

    }

}
