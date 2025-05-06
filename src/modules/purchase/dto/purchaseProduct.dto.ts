import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class PurchaseProductDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'Quantity must be a positive number' })
    quantity: number;

    @IsNotEmpty()
    @IsPositive({ message: 'Total price must be a positive number' })
    totalPrice: number;

}