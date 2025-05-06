import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteProductDto {
    @IsNotEmpty()
    @IsInt()
    id: number;
}