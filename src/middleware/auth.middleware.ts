import { NextFunction, Request, Response } from 'express';
declare global {
  namespace Express {
    interface Request {
      isAuthenticated: boolean;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  req.isAuthenticated = true;
  next();
};

export default authenticate;
