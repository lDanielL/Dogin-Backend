import { Usuario } from 'src/usuarios/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @ApiProperty({ description: 'El número de teléfono del cuidador.', example: '555-1234' })
  telefono: string;

  @Column()
  @ApiProperty({ description: 'La URL de la foto del carnet delantera del cuidador.', example: 'https://example.com/foto-carnet-delantera.jpg' })
  fotoCarnetDelante: string;

  @Column()
  @ApiProperty({ description: 'La URL de la foto del carnet trasera del cuidador.', example: 'https://example.com/foto-carnet-trasera.jpg' })
  fotoCarnetDetras: string;

  @OneToOne(() => Usuario, { nullable: false, eager: true })
  @JoinColumn({ name: 'idUsuario' })
  @ApiProperty({ description: 'El usuario asociado al cuidador.', example: { id: 1, nombre: 'John Doe', email: 'johndoe@example.com' } })
  usuario: Usuario;
}
