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
exports.PurchaseRoutes = void 0;
const inject_cls_1 = require("../../decorator/inject-cls");
const express_1 = require("express");
const purchase_controller_1 = require("./purchase.controller");
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
class PurchaseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.inRoutes();
    }
    inRoutes() {
        this.router.post("/purchaseProduct", this.jwtMiddleWare.verifyToken, this.jwtMiddleWare.checkRole('user'), this.purchaseController.purchaseProduct);
        this.router.get("/history/:id", this.jwtMiddleWare.verifyToken, this.jwtMiddleWare.checkRole('user'), this.purchaseController.purchaseHistory);
    }
}
exports.PurchaseRoutes = PurchaseRoutes;
__decorate([
    (0, inject_cls_1.InjectCls)(purchase_controller_1.PurchaseController),
    __metadata("design:type", purchase_controller_1.PurchaseController)
], PurchaseRoutes.prototype, "purchaseController", void 0);
__decorate([
    (0, inject_cls_1.InjectCls)(jwt_middleware_1.JwtMiddleWare),
    __metadata("design:type", jwt_middleware_1.JwtMiddleWare)
], PurchaseRoutes.prototype, "jwtMiddleWare", void 0);
//# sourceMappingURL=purchase.routes.js.map