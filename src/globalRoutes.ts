import { Router } from "express";
import { UserRoutes } from "./modules/user/user.routes";
import { ProductRoutes } from "./modules/product/product.routes";
import { PurchaseRoutes } from "./modules/purchase/purchase.routes";
import { DummyRoutes } from "@modules/dummy/dummy.routes";

export class Routes{
    public config(){
        const router = Router();
        router.use("/auth",new UserRoutes().router)
        router.use("/products",new ProductRoutes().router)
        router.use("/purchase",new PurchaseRoutes().router)
        router.use("/dummy", new DummyRoutes().router)
        return router;
    }
}