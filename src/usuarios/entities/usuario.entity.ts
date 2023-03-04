import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl, Max, MaxLength, Min, MinLength, IsBoolean } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {

    @ApiProperty({
        description: 'Almacena ID númerio del usuario',
        example: 1,
        name: 'ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment')
    id: number;


    @ApiProperty({
        description: 'Almacena los nombres del usuario.',
        example: 'Homero Jay',
        maxLength: 30,
        minLength: 2,
        name: 'NOMBRES',
        nullable: false,
    })
    @IsNotEmpty()
    @MaxLength(30, { message: 'No puede ser mayor a 30 caracteres.' })
    @MinLength(2, { message: 'No puede ser menor a 2 caracteres.' })
    @Column({
        type: 'text',
        nullable: false,
        transformer: {
            to(value) { return value },
            from(value) { return value.trim() }
        }
    })
    nombres: string;


    @ApiProperty({
        description: 'Almacena los nombres del usuario.',
        example: 'Simpson',
        maxLength: 30,
        minLength: 2,
        name: 'APELLIDOS',
        nullable: false,
    })
    @IsNotEmpty()
    @MaxLength(30, { message: 'No puede ser mayor a 30 caracteres.' })
    @MinLength(2, { message: 'No puede ser menor a 2 caracteres.' })
    @Column('text', {
        nullable: false,
    })
    apellidos: string;


    @ApiProperty({
        description: 'Almacena el email del usuario.',
        example: 'homer.jay@simpson.com',
        maxLength: 319,
        minLength: 7,
        name: 'EMAIL',
        nullable: false,
        uniqueItems: true,
    })
    @IsNotEmpty()
    @MaxLength(319, { message: 'No puede ser mayor a 319 caracteres.' })
    @MinLength(7, { message: 'No puede ser menor a 7 caracteres.' })
    @Column('text', {
        nullable: false,
        unique: true
    })
    email: string;


    @ApiProperty({
        description: 'Almacena la contraseña del usuario.',
        example: '123456',
        maxLength: 10,
        minLength: 6,
        name: 'CONTRASEÑA',
        nullable: false
    })
    @IsNotEmpty({ message: 'Password no puede ser nulo.' })
    @MaxLength(10, { message: 'No puede ser mayor a 10 caracteres.' })
    @MinLength(6, { message: 'No puede ser menor a 6 caracteres.' })
    @Column('text', {
        nullable: false,
        select: false,
        transformer: {
            to(value) { return value },
            from(value) { return value.trim() }
        }
    })
    password: string;


    @ApiProperty({
        description: 'Almacena la url de la imagen de perfil del usuario.',
        example: 'http://mifoto.cl',
        name: 'IMAGEN DE PÉRFIL',
        nullable: false
    })
    @IsOptional()
    @Column('text', {
        nullable: true,
    })
    imagenDePerfil: string;


    @ApiProperty({
        default: true,
        description: 'Almacena la url de la imagen de perfil del usuario.',
        example: 'http://mifoto.cl',
        name: 'ESTADO',
    })
    @IsBoolean()
    @IsOptional()
    @Column('bool', {
        default: true,
    })
    estado: boolean;


    @ApiProperty({
        default: '[usuario]',
        description: 'Almacena la url de la imagen de perfil del usuario.',
        example: '[usuario]',
        name: 'ROLES',
    })
    @IsOptional()
    @Column('text', {
        array: true,
        default: ['usuario'],
    })
    roles: string[];


    @BeforeInsert()
    @BeforeUpdate()
    convertirAMinusculas() {
        Object.keys(this).forEach(key => {
            if (typeof this[key] === 'string' && key !== 'password') {
                this[key] = this[key].toLowerCase().trim();
            }
        });
    }


}
