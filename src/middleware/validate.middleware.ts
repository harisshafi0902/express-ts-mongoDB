import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error: any) {
    console.log('error', error);
    // const errorFinal = error?.map((el: any) => ({ code: el?.code, errorMessage: el?.message }));
    return res.status(400).json(error);
  }
};
