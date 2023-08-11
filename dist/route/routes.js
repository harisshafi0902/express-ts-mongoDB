"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller")); // Correct the import path if needed
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
router.use('/users', userController.router);
exports.default = router;
