import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Usuario } from '../../usuarios/entities/usuario.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {


        // const { id } = payload;
        // const usuario = await this.userRepository.findOneBy({ id: +id });

        // if (!usuario) throw new UnauthorizedException("Token inválido.");
        // if (!usuario.estado) throw new UnauthorizedException("Usuario inactivo.");


        return /* usuario */;

    }

}
