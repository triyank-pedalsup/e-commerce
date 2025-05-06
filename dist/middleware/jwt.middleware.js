"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtMiddleWare {
    constructor() {
        this.generateToken = async (payload) => {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });
            return token;
        };
        this.verifyToken = async (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.send("token missing");
            }
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            }
            catch (error) {
                return res.json({ message: 'Forbidden: Invalid token' });
            }
        };
    }
    checkRole(role) {
        return (req, res, next) => {
            if (req.user?.role !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        };
    }
}
exports.JwtMiddleWare = JwtMiddleWare;
