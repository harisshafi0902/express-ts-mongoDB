"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("@/controller/user.controller"));
const app = new app_1.default([new user_controller_1.default()], Number(process.env.PORT));
app.listen();
