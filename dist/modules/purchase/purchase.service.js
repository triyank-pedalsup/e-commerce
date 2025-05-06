"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const index_js_1 = require("../../../prisma/generated/prisma/index.js");
const prisma = new index_js_1.PrismaClient();
class PurchaseService {
    async purchase(data) {
        const user = await prisma.purchase.create({
            data
        });
        return user;
    }
    async findProduct(id) {
        const findproduct = await prisma.product.findUnique({
            where: {
                id
            }
        });
        return findproduct;
    }
    async purchaseHistory(id) {
        const purchaseHistory = await prisma.purchase.findMany({
            where: {
                id
            },
            include: {
                product: true
            }
        });
        return purchaseHistory;
    }
}
exports.PurchaseService = PurchaseService;
