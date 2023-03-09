import { Usuario } from 'src/usuarios/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional } from 'class-validator';

@Entity({ name: 'cuidadores' })
export class Cuidador {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'El ID único del cuidador.', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'La URL de la foto principal del cuidador.', example: 'https://example.com/foto-principal.jpg' })
  fotoPrincipal: string;

  @Column()
  @ApiProperty({ description: 'La dirección del cuidador.', example: 'Calle 123, Ciudad' })
  direccion: string;

  @Column('float', { array: true, nullable: true })
  @ApiProperty({
    description: 'Las coordenadas del cuidador en formato [latitud, longitud].',
    example: [37.7749, -122.4194]
  })
  coordenadas: [number, number];

  @Column()
  @ApiProperty({ description: 'El número de teléfono del cuidador.', example: '555-1234' })
  telefono: string;

  @Column()
  @ApiProperty({ description: 'La URL de la foto del carnet delantera del cuidador.', example: 'https://example.com/foto-carnet-delantera.jpg' })
  fotoCarnetDelante: string;

  @Column()
  @ApiProperty({ description: 'La URL de la foto del carnet trasera del cuidador.', example: 'https://example.com/foto-carnet-trasera.jpg' })
  fotoCarnetDetras: string;

  @Column({nullable:true})
  @ApiProperty({ description: 'La fecha de nacimiento del cuidador.', example: '01/01/1980' })
  fechaNacimiento: string;

  @Column('simple-array',{nullable:true})
  @ApiProperty({
    description: 'Los tipos de servicios que ofrece el cuidador.',
    example: ['Paseo', 'Alojamiento'],
  })
  tiposServicios: string[];

  @Column({nullable:true})
  @ApiProperty({ description: 'Una breve descripción sobre el cuidador.', example: 'Qui adipisicing ipsum consequat velit in fugiat.' })
  sobreMi: string;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'idUsuario' })
  @ApiProperty({ description: 'El usuario asociado al cuidador.', example: { id: 1, nombre: 'John Doe', email: 'johndoe@example.com' } })
  idUsuario: number;

  @ApiProperty({
    default: true,
    description: 'Almacena el estado del cuidador.',
    example: false,
    name: 'ESTADO',
  })
  @IsBoolean({ message: 'El estado debe ser true o false' })
  @IsOptional()
  @Column('bool', {
    default: true,
  })
  estado: boolean;
}
