import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../../../../prisma/generated/prisma/index.js";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message: 'password must be at least 6 characters'})
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole,{message: "Role must be a 'user' or 'admin'"})
    role: UserRole
}