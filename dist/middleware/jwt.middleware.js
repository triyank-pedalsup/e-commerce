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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtMiddleWare {
    constructor() {
        this.generateToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });
            return token;
        });
        this.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    checkRole(role) {
        return (req, res, next) => {
            var _a;
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        };
    }
}
exports.JwtMiddleWare = JwtMiddleWare;
//# sourceMappingURL=jwt.middleware.js.map