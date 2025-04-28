import { PrismaClient } from "../../../prisma/generated/prisma/index.js";
const prisma = new PrismaClient();

export class PurchaseService {
    async purchase(data:any){
        const purchase = await prisma.purchase.create({
            data,
        })
        return purchase;
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