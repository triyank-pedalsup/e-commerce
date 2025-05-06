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
exports.ProductService = void 0;
const index_js_1 = require("../../../prisma/generated/prisma/index.js");
const prisma = new index_js_1.PrismaClient();
class ProductService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.create({
                data
            });
            return product;
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.findMany();
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.delete({
                where: {
                    id
                }
            });
            return product;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.update({
                where: {
                    id
                },
                data
            });
            return product;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map