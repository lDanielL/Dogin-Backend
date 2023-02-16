import { ApiProperty } from "@nestjs/swagger";
import { Max, Min } from "class-validator";
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
