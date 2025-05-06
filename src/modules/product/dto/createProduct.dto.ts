import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProdcutDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'product name must be at least 3 characters' })
    name: string;

    @IsNotEmpty()
    @IsPositive({ message: 'price must be a positive number' })
    price: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'description must be at least 10 characters' })
    description: string;    
    
}