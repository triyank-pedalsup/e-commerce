import { InjectCls } from "../../decorator/inject-cls";
import { ProductController } from "./product.controller";
import { Router } from "express";
import { JwtMiddleWare } from "../../middleware/jwt.middleware";

export class ProductRoutes {

    public router : Router;

    @InjectCls(ProductController)
    private productController : ProductController;

    @InjectCls(JwtMiddleWare)
    private jwtMiddleWare : JwtMiddleWare;

    constructor(){
        this.router = Router();
        this.inRoutes();
    }

    inRoutes(): void {
        this.router.post("/createProduct",this.jwtMiddleWare.verifyToken,this.jwtMiddleWare.checkRole('admin'),this.productController.create)
        this.router.get("/getProduct",this.productController.getProduct)
        this.router.delete("/deleteProduct/:id",this.jwtMiddleWare.verifyToken,this.jwtMiddleWare.checkRole('admin'),this.productController.deleteProduct)
        this.router.put("/updateProduct/:id",this.jwtMiddleWare.verifyToken,this.jwtMiddleWare.checkRole('admin'),this.productController.updateProduct)
    }
}