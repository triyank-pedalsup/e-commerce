"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const inject_cls_1 = require("../../decorator/inject-cls");
const user_service_1 = require("./user.service");
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
const logger_helpers_1 = require("../../helpers/logger.helpers");
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const { name, email, password, role } = req.body;
                const existingUser = await this.userService.findUserByEmail(email);
                if (existingUser) {
                    return res.send("email already registered");
                }
                if (role !== 'admin' && role !== 'user') {
                    return res.send({ message: "Invalid role. Role must be 'admin' or 'user'" });
                }
                const hashPassword = await bcrypt_1.default.hash(password, 10);
                const data = await this.userService.register({
                    name,
                    email,
                    password: hashPassword,
                    role,
                });
                logger_helpers_1.customLogger.info("new user created");
                res.status(201).json({ message: `${role} account created successfully`, data });
            }
            catch (error) {
                logger_helpers_1.customLogger.error(`error in creating user: ${error.message}`);
                res.status(500).json({ message: "error in registration" });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.send("Email and password required");
                }
                const user = await this.userService.login(email);
                if (!user) {
                    return res.send("User not found");
                }
                const isMatch = await bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.send("Password is invalid");
                }
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
                const token = await this.jwtMiddleWare.generateToken(payload);
                res.status(200).json({ message: "Logged in successfully", token });
            }
            catch (error) {
                res.status(500).json({ message: "Logged in fail", error: error });
            }
        };
        this.adminLogin = async (req, res) => {
            try {
                res.status(200).json({ message: 'admin login successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'admin not found', error: error });
            }
        };
        this.userLogin = async (req, res) => {
            try {
                res.status(200).json({ message: 'user login successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'user not found', error: error });
            }
        };
    }
}
exports.UserController = UserController;
__decorate([
    (0, inject_cls_1.InjectCls)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, inject_cls_1.InjectCls)(jwt_middleware_1.JwtMiddleWare),
    __metadata("design:type", jwt_middleware_1.JwtMiddleWare)
], UserController.prototype, "jwtMiddleWare", void 0);
