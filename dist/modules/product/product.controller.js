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
exports.ProductController = void 0;
const inject_cls_1 = require("../../decorator/inject-cls");
const product_service_1 = require("./product.service");
class ProductController {
    constructor() {
        //create product - only admin
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, description, } = req.body;
                const data = yield this.productService.create({
                    name,
                    price,
                    description,
                });
                res.status(201).json({ message: "product created successfully", data });
            }
            catch (error) {
                res.status(500).json({ message: "error in adding product" });
            }
        });
        //getProduct
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productService.get();
                res.json({ message: "fetch all product successfully", data });
            }
            catch (error) {
                res.status(500).json({ message: "can't get product. something wrong." });
            }
        });
        //deleteProduct - only admin
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const data = yield this.productService.delete(id);
                res.json({ message: "deleted product successfully", data });
            }
            catch (error) {
                res.status(500).json({ message: "can't delete product. something wrong." });
            }
        });
        //updateProduct - only admin
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { name, price, description, } = req.body;
                const updatedData = Object.assign(Object.assign(Object.assign({}, (name && { name })), (price && { price })), (description && { description }));
                const data = yield this.productService.update(id, updatedData);
                res.json({ message: "update data successfully", data: data });
            }
            catch (error) {
                res.status(500).json({ message: "can't update product. something wrong." });
            }
        });
    }
}
exports.ProductController = ProductController;
__decorate([
    (0, inject_cls_1.InjectCls)(product_service_1.ProductService),
    __metadata("design:type", product_service_1.ProductService)
], ProductController.prototype, "productService", void 0);
//# sourceMappingURL=product.controller.js.map