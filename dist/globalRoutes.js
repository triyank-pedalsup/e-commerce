"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const user_routes_1 = require("./modules/user/user.routes");
const product_routes_1 = require("./modules/product/product.routes");
const purchase_routes_1 = require("./modules/purchase/purchase.routes");
class Routes {
    config() {
        const router = (0, express_1.Router)();
        router.use("/auth", new user_routes_1.UserRoutes().router);
        router.use("/products", new product_routes_1.ProductRoutes().router);
        router.use("/purchase", new purchase_routes_1.PurchaseRoutes().router);
        return router;
    }
}
exports.Routes = Routes;
