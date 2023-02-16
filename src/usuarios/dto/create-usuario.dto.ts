import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty({
        description: 'Nombres del usuario',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    nombres: string;

    @ApiProperty({
        description: 'Apellidos del usuario',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    apellidos: string;

    @ApiProperty({
        description: 'Email del usuario',
        nullable: false,
        minLength: 1
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password del usuario, mínimo 4 caracteres, máximo 10.',
        nullable: false,
        minLength: 1
    })
    @MinLength(4)
    @MaxLength(10)
    password: string;

    @IsOptional()
    @Matches(/^https?:\/\/.*$/, {
        message: 'La URL de la imagen debe comenzar con "http://" o "https://"',
    })
    imagenDePerfil: string;

    @ApiProperty({
        description: 'Estado del usuario.',
        default: true
    })
    @IsOptional()
    @IsBoolean()
    estado: boolean;




}
