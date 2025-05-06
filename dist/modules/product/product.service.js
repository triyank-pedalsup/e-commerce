"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const index_js_1 = require("../../../prisma/generated/prisma/index.js");
const prisma = new index_js_1.PrismaClient();
class ProductService {
    async create(data) {
        const product = await prisma.product.create({
            data
        });
        return product;
    }
    async get() {
        const product = await prisma.product.findMany();
        return product;
    }
    async delete(id) {
        const product = await prisma.product.delete({
            where: {
                id
            }
        });
        return product;
    }
    async update(id, data) {
        const product = await prisma.product.update({
            where: {
                id
            },
            data
        });
        return product;
    }
}
exports.ProductService = ProductService;
