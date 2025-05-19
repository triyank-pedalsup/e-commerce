import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";  
import { Constants } from "../configs/index";
const prisma = new PrismaClient();

export async function destructPagerMiddleware(req: Request, res: Response):Promise<any> {
    try {
        let page = parseInt(req.query.page as string) || (Constants.PAGER.page);
        const limit = parseInt(req.query.limit as string) || (Constants.PAGER.limit);
        
        const skip = (page - 1) * limit;
        
        const products = await prisma.product.findMany({
            skip: skip,
            take: limit,
        })

        const totalProducts = await prisma.product.count();

        const totalPages = Math.ceil(totalProducts/limit);

        if(page>totalPages){
            return res.send({ message: "page not found" })
        }

        res.json({
            data: products,
            totalProducts,
            page,
            limit,
            pages: totalPages
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}