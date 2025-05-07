import { PrismaClient } from "../../../prisma/generated/prisma/index.js";
// import { PurchaseProductDto } from "./dto/purchaseProduct.dto";
const prisma = new PrismaClient();

export class PurchaseService {
    public async purchase(data: any){
        const user = await prisma.purchase.create({
            data
        })
        return user;
    }


    async findProduct(id: number){
        const findproduct = await prisma.product.findUnique({
            where:{
                id
            }
        })
        return findproduct;
    }

    async purchaseHistory(id: number){
        const purchaseHistory = await prisma.purchase.findMany({
            where: {
                id
            },
            include: {
                product: true
            }
        })
        return purchaseHistory;
    }
}