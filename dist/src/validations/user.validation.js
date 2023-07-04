"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const zod_1 = require("zod");
exports.createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    }),
});
