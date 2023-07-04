"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = void 0;
const zod_1 = require("zod");
exports.createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        first_name: zod_1.z.string().min(2).max(30),
        last_name: zod_1.z.string().min(3).max(30),
    }),
});
exports.updateUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().max(25).optional(),
        first_name: zod_1.z.string().max(30).optional(),
        last_name: zod_1.z.string().max(30).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
