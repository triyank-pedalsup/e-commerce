"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destructPagerMiddleware = destructPagerMiddleware;
const index_js_1 = require("../../prisma/generated/prisma/index.js");
const index_1 = require("../configs/index");
const prisma = new index_js_1.PrismaClient();
function destructPagerMiddleware(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = parseInt(req.query.page) || (index_1.Constants.PAGER.page);
            const limit = parseInt(req.query.limit) || (index_1.Constants.PAGER.limit);
            const skip = (page - 1) * limit;
            const products = yield prisma.product.findMany({
                skip: skip,
                take: limit,
            });
            const totalProducts = yield prisma.product.count();
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
    });
}
//# sourceMappingURL=destruct-pager-middleware.js.map