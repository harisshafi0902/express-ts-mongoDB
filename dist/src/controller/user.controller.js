"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("@/model/user.model"));
const response_1 = __importDefault(require("@/helper/response"));
const validate_middleware_1 = require("@/../middleware/validate.middleware");
const user_validation_1 = require("@/validations/user.validation");
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        console.log('Initialize routes');
        this.router.get(`${this.path}/`, this.checkRoute);
        this.router.post(`${this.path}/`, (0, validate_middleware_1.validate)(user_validation_1.createUser), this.createUser);
    }
    checkRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                status: 'success',
                mesage: 'Route successful',
            });
        });
    }
    userList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                status: 'success',
                users: [{ name: 'Ali' }, { name: 'Ahmed' }],
            });
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const result = yield user_model_1.default.createUser(user);
                console.log('result', result);
                return res.status(response_1.default.CREATED).json({
                    status: 'success',
                    users: [{ name: 'Ali' }, { name: 'Ahmed' }],
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
}
exports.default = UserController;
