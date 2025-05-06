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
exports.ProductRoutes = void 0;
const inject_cls_1 = require("../../decorator/inject-cls");
const product_controller_1 = require("./product.controller");
const express_1 = require("express");
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
const destruct_pager_middleware_1 = require("../../middleware/destruct-pager-middleware");
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.inRoutes();
    }
    inRoutes() {
        this.router.post("/createProduct", this.jwtMiddleWare.verifyToken, this.jwtMiddleWare.checkRole('admin'), this.productController.create);
        this.router.get("/getProduct", destruct_pager_middleware_1.destructPagerMiddleware, this.productController.getProduct);
        this.router.delete("/deleteProduct/:id", this.jwtMiddleWare.verifyToken, this.jwtMiddleWare.checkRole('admin'), this.productController.deleteProduct);
        this.router.put("/updateProduct/:id", this.jwtMiddleWare.verifyToken, this.jwtMiddleWare.checkRole('admin'), this.productController.updateProduct);
    }
}
exports.ProductRoutes = ProductRoutes;
__decorate([
    (0, inject_cls_1.InjectCls)(product_controller_1.ProductController),
    __metadata("design:type", product_controller_1.ProductController)
], ProductRoutes.prototype, "productController", void 0);
__decorate([
    (0, inject_cls_1.InjectCls)(jwt_middleware_1.JwtMiddleWare),
    __metadata("design:type", jwt_middleware_1.JwtMiddleWare)
], ProductRoutes.prototype, "jwtMiddleWare", void 0);
