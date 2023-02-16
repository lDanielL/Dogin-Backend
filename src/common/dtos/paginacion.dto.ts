import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginacionDto {


    @ApiProperty({
        default:10,
        description:'Especifica la cantidad de rows a retornar.'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limit?: number;


    @ApiProperty({
        default:0,
        description:'Especifica la la siguiente cantidad de rows a retornar'
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number )
    offset?: number;

}
