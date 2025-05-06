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
exports.PurchaseController = void 0;
const inject_cls_1 = require("../../decorator/inject-cls");
const purchase_service_1 = require("./purchase.service");
const logger_helpers_1 = require("../../helpers/logger.helpers");
class PurchaseController {
    constructor() {
        //purchase product - only user
        this.purchaseProduct = async (req, res) => {
            try {
                const { productId, quantity, } = req.body;
                const user = req.user;
                if (!productId || !quantity || quantity <= 0) {
                    return res.send({ message: "productId and quantity is required, quantity is positive" });
                }
                const product = await this.purchaseService.findProduct(parseInt(productId));
                if (!product) {
                    return res.send({ message: "product is notfound" });
                }
                let balance = 200000;
                const totalPrice = product.price * quantity;
                if (totalPrice > balance) {
                    return res.send({ message: "balance is insufficient" });
                }
                balance -= totalPrice;
                const purchase = await this.purchaseService.purchase({
                    userId: user.id,
                    productId: productId,
                    quantity,
                    totalPrice,
                });
                logger_helpers_1.customLogger.info("successfully purchase product");
                res.send({ message: "product purchase successfully",
                    purchaseDetails: {
                        productId: productId,
                        productName: product.name,
                        quantity: quantity,
                        totalPrice: totalPrice,
                        balance
                    }
                });
            }
            catch (error) {
                logger_helpers_1.customLogger.error(`Error in purchasing product: ${error.message}`);
                res.status(500).json({ message: "error in purchasing product" });
            }
        };
        //purchaseHistory
        this.purchaseHistory = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const purchaseHistory = await this.purchaseService.purchaseHistory(id);
                if (!purchaseHistory || purchaseHistory.length === 0) {
                    return res.status(404).json({ message: "No purchase history found" });
                }
                const formattedHistory = purchaseHistory.map(purchase => ({
                    productName: purchase.product.name,
                    quantity: purchase.quantity,
                    totalPrice: purchase.totalPrice,
                }));
                res.status(200).json({
                    message: "purchase history",
                    purchaseHistory: formattedHistory
                });
            }
            catch (error) {
                res.status(500).json({ message: "error to find purchase history" });
            }
        };
    }
}
exports.PurchaseController = PurchaseController;
__decorate([
    (0, inject_cls_1.InjectCls)(purchase_service_1.PurchaseService),
    __metadata("design:type", purchase_service_1.PurchaseService)
], PurchaseController.prototype, "purchaseService", void 0);
