import { RateLimitHelper } from "../../helpers/index";
import { InjectCls } from "../../decorator/inject-cls";
import { DummyController } from "./dummy.controller";
import { Router } from "express";

export class DummyRoutes {

    public router: Router;

    @InjectCls(DummyController)
    private dummyController: DummyController;

    constructor() {
        this.router = Router();
        this.inRoutes();
    }

    inRoutes(): void {
        this.router.get('/', new RateLimitHelper().limiter,this.dummyController.dummy.bind(this.dummyController))
    }
}