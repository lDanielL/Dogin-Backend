import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCuidadorDto {


    @ApiProperty({ description: 'La URL de la foto principal del cuidador.', example: 'https://example.com/foto-principal.jpg' })
    @IsNotEmpty()
    fotoPrincipal: string;

    @ApiProperty({ description: 'La dirección del cuidador.', example: 'Calle 123, Ciudad' })
    @IsNotEmpty()
    direccion: string;

    @ApiProperty({ description: 'El número de teléfono del cuidador.', example: '555-1234' })
    @IsNotEmpty()
    telefono: string;

    @ApiProperty({ description: 'La URL de la foto del carnet delantera del cuidador.', example: 'https://example.com/foto-carnet-delantera.jpg' })
    @IsOptional()
    fotoCarnetDelante?: string;

    @ApiProperty({ description: 'La URL de la foto del carnet trasera del cuidador.', example: 'https://example.com/foto-carnet-trasera.jpg' })
    @IsOptional()
    fotoCarnetDetras?: string;

    @ApiProperty({ description: 'El ID del usuario asociado al cuidador.', example: 1 })
    @IsNotEmpty()
    idUsuario: number;
}
