import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class LoginUsuarioDto {


    @ApiProperty({
        description:'Email del usuario',
        nullable: false,
        minLength: 1
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description:'Password del usuario, mínimo 4 caracteres, máximo 10.',
        nullable: false,
        minLength: 1
    })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    password: string;

}