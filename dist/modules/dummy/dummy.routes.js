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
exports.DummyRoutes = void 0;
const inject_cls_1 = require("../../decorator/inject-cls");
const dummy_controller_1 = require("./dummy.controller");
const express_1 = require("express");
class DummyRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.inRoutes();
    }
    inRoutes() {
        this.router.get('/', this.dummyController.dummy.bind(this.dummyController));
    }
}
exports.DummyRoutes = DummyRoutes;
__decorate([
    (0, inject_cls_1.InjectCls)(dummy_controller_1.DummyController),
    __metadata("design:type", dummy_controller_1.DummyController)
], DummyRoutes.prototype, "dummyController", void 0);
