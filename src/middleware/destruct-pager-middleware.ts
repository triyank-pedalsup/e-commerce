import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";
const prisma = new PrismaClient();

export async function destructPagerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 3;

        const skip = (page - 1) * limit;
        
        const products = await prisma.product.findMany({
            skip: skip,
            take: limit,
        })

        const total = await prisma.product.count();

        res.json({
            totalProducts: total,
            page,
            pages: Math.ceil(total/limit),
            products,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}