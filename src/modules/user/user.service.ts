import { PrismaClient } from '../../../prisma/generated/prisma/index.js';
// import { LoginUserDto } from './dto/login.dto.js';
// import { RegisterUserDto } from './dto/register.dto.js';
const prisma = new PrismaClient();

export class UserService {
    public async register(data: any){
        const user = await prisma.user.create({
            data
        })
        return user;
    }

    public async login(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    }

    public async findUserByEmail(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    }
}