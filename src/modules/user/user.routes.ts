import { JwtMiddleWare } from "../../middleware/jwt.middleware";
import { InjectCls } from "../../decorator/inject-cls";
import { UserController } from "./user.controller";
import { Router } from "express";

export class UserRoutes{

    public router : Router;
    
    @InjectCls(UserController)
    private userController : UserController;

    @InjectCls(JwtMiddleWare)
    private jwtMiddleware : JwtMiddleWare;

    constructor(){
        this.router = Router();
        this.inRoutes();
    }

    inRoutes(): void{
        this.router.post("/register",this.userController.register)
        this.router.post("/login",this.userController.login)
        this.router.post("/admin",this.jwtMiddleware.verifyToken,this.jwtMiddleware.checkRole('admin'),this.userController.adminLogin)
        this.router.post("/user",this.jwtMiddleware.verifyToken,this.jwtMiddleware.checkRole('user'),this.userController.userLogin)
    }
}