import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'product name must be at least 3 characters' })
    name: string;  // Removed default value to avoid validation conflict

    @IsNotEmpty()
    @IsPositive({ message: 'price must be a positive number' })
    price: number;  // Removed default value to avoid validation conflict

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'description must be at least 10 characters' })
    description: string;  // Removed default value to avoid validation conflict
}
