import { PrismaClient } from "../../../prisma/generated/prisma/index.js";
import { CreateProdcutDto } from "./dto/createProduct.dto.js";
import { UpdateProductDto } from "./dto/updateProduct.dto.js";
const prisma = new PrismaClient();

export class ProductService {
    async create(data: CreateProdcutDto){
        const existingProduct = await prisma.product.findFirst({
            where:{
                name: data.name,
                price: data.price,
                description: data.description
            }
        })

        if (existingProduct) {
            throw new Error("Product already exists.");
        }

        const product = await prisma.product.create({
            data
        })
        return product;
    }

    async get(){
        const product = await prisma.product.findMany();
        return product;
    }

    async delete(id: number){
        const product = await prisma.product.delete({
            where:{
                id
            }
        })
        return product;
    }

    async update(id: number, data: UpdateProductDto){
        const product = await prisma.product.update({
            where:{
                id
            },
            data
        })
        return product;
    }
}