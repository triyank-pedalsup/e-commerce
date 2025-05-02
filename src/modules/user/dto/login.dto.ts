import { IsEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsEmpty()
    @IsString()
    email: String
}