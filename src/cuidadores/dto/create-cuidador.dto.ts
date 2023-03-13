import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCuidadorDto {


    @ApiProperty({ 
        description: 'La URL de la foto principal del cuidador.',
        nullable: false, 
        example: 'https://example.com/foto-principal.jpg' })
    @IsNotEmpty({
        message: 'fotoPrincipal debe tener algún valor.'
    })
    fotoPrincipal: string;

    @ApiProperty({ 
        description: 'La dirección del cuidador.', 
        nullable:false,
        example: 'Calle 123' 
    })
    @IsNotEmpty()
    direccion: string;

    @ApiProperty({ description: 'Las coordenadas del cuidador como un arreglo de dos números: [latitud, longitud].', example: [40.4167, -3.70325] })
    @IsArray({
        message:'coordenadas debe ser un arreglo con dos coordenadas.'
    })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    coordenadas: [number, number];

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

    @IsNotEmpty()
    @ApiProperty({
        description: 'La fecha de nacimiento del usuario.',
        nullable: false,
        example: '01/01/1980',
    })
    fechaNacimiento: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true, message: 'Cada elemento de tiposServicios debe ser una cadena.' })
    tiposServicios: string[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sobreMi: string;

}
