import { InjectCls } from "../../decorator/inject-cls";
import { Router } from "express";
import { PurchaseController } from "./purchase.controller";
import { JwtMiddleWare } from "../../middleware/jwt.middleware";

export class PurchaseRoutes {
    public router : Router;
    
    @InjectCls(PurchaseController)
    private purchaseController : PurchaseController;

    @InjectCls(JwtMiddleWare)
    private jwtMiddleWare : JwtMiddleWare;

    constructor(){
        this.router = Router();
        this.inRoutes();
    }

    inRoutes():void{
        this.router.post("/purchaseProduct",this.jwtMiddleWare.verifyToken,this.jwtMiddleWare.checkRole('user'),this.purchaseController.purchaseProduct)
    }
}