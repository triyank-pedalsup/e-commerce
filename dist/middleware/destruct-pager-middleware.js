"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destructPagerMiddleware = destructPagerMiddleware;
const index_js_1 = require("../../prisma/generated/prisma/index.js");
const index_1 = require("../configs/index");
const prisma = new index_js_1.PrismaClient();
async function destructPagerMiddleware(req, res) {
    try {
        let page = parseInt(req.query.page) || (index_1.Constants.PAGER.page);
        const limit = parseInt(req.query.limit) || (index_1.Constants.PAGER.limit);
        const skip = (page - 1) * limit;
        const products = await prisma.product.findMany({
            skip: skip,
            take: limit,
        });
        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts / limit);
        if (page > totalPages) {
            return res.send({ message: "page not found" });
        }
        res.json({
            totalProducts,
            page,
            pages: totalPages,
            products,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
