"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalRoutes_1 = require("./globalRoutes");
const morgan_1 = __importDefault(require("morgan"));
require('dotenv').config();
const app = (0, express_1.default)();
const routes = new globalRoutes_1.Routes();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use("/", routes.config());
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
