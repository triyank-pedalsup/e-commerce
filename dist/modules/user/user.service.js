"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const index_js_1 = require("../../../prisma/generated/prisma/index.js");
const prisma = new index_js_1.PrismaClient();
class UserService {
    async register(data) {
        const user = await prisma.user.create({
            data
        });
        return user;
    }
    async login({ email }) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }
    async findUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }
}
exports.UserService = UserService;
