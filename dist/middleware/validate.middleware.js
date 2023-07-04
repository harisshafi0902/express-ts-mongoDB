"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        console.log('error', error);
        // const errorFinal = error?.map((el: any) => ({ code: el?.code, errorMessage: el?.message }));
        return res.status(400).json(error);
    }
};
exports.validate = validate;
