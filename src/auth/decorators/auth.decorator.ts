import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { UsuarioRolGuard } from '../guards/usuario-rol/usuario-rol.guard';


export function Auth(...roles: ValidRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UsuarioRolGuard)
    );

}