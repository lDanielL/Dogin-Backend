import { ApiProperty } from "@nestjs/swagger";
import { IsUrl, Max, Min } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuarios'})
export class Usuario {

    @ApiProperty({
        example: 1,
        description: 'Almacena ID númerio del usuario',
        uniqueItems: true,
        name: 'ID'
    })
    @PrimaryGeneratedColumn('increment')
    id:number;

    @ApiProperty({
        example: 'Homero Jay',
        description: 'Almacena los nombres del usuario.',
        uniqueItems: true
    })
    @Column('text',{
        nullable:false,
    })
    nombres: string;

    @ApiProperty({
        example: 'Simpson',
        description: 'Almacena los nombres del usuario.',
        uniqueItems: true
    })
    @Column('text',{
        nullable:false,
    })
    apellidos: string;

    @ApiProperty({
        example: 'homer.jay@simpson.com',
        description: 'Almacena el email del usuario.',
        uniqueItems: true
    })
    @Column('text',{
        nullable:false,
        unique: true
    })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Almacena la contraseña del usuario.',
    })
    @Column('text',{
        nullable:false,
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'http://mifoto.cl',
        description: 'Almacena la url de la imagen de perfil del usuario.',
    })
    @Column('text',{
        nullable: true
    })
    @IsUrl()
    imagenDePerfil: string;
    
    @Column('bool',{
        default: true
    })
    estado: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    convertirAMinusculas() {
        this.nombres = this.nombres.toLowerCase().trim();
        this.apellidos = this.apellidos.toLowerCase().trim();
        this.email = this.email.toLowerCase().trim();
    }


}
