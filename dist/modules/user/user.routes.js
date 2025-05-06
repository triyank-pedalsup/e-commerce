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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
const inject_cls_1 = require("../../decorator/inject-cls");
const user_controller_1 = require("./user.controller");
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.inRoutes();
    }
    inRoutes() {
        this.router.post("/register", this.userController.register);
        this.router.post("/login", this.userController.login);
        this.router.post("/admin", this.jwtMiddleware.verifyToken, this.jwtMiddleware.checkRole('admin'), this.userController.adminLogin);
        this.router.post("/user", this.jwtMiddleware.verifyToken, this.jwtMiddleware.checkRole('user'), this.userController.userLogin);
    }
}
exports.UserRoutes = UserRoutes;
__decorate([
    (0, inject_cls_1.InjectCls)(user_controller_1.UserController),
    __metadata("design:type", user_controller_1.UserController)
], UserRoutes.prototype, "userController", void 0);
__decorate([
    (0, inject_cls_1.InjectCls)(jwt_middleware_1.JwtMiddleWare),
    __metadata("design:type", jwt_middleware_1.JwtMiddleWare)
], UserRoutes.prototype, "jwtMiddleware", void 0);
//# sourceMappingURL=user.routes.js.map