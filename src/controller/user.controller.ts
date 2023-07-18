import { createUser } from './../validations/user.validation';
import { NextFunction, Request, Response, Router } from 'express';
import { IController } from '@/interface/controller.interface';
import userModel from '@/model/user.model';
import ResponseStatus from '@/helper/response';
import { validate } from '@/middleware/validate.middleware';
import { createUser as validateUser, updateUser } from '@/validations/user.validation';
import { any, string } from 'zod';
import { SendMailDTO } from '@/dto/sendMailDTO';
import { SendEmail } from '../decorators/sendEmailDecorator';
export default class UserController implements IController {
  public path = '/users';
  public router = Router();
  mailService: any;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/getall`, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(`${this.path}/`, validate(validateUser), this.createUser);
    this.router.patch(`${this.path}/:id`, validate(updateUser), this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await userModel.getUser(req.params.id);
      console.log('user', user);
      if (!user || user.length === 0)
        return res.status(ResponseStatus.NOT_FOUND).json({
          status: 'not found',
          message: 'User not found',
        });

      return res.status(ResponseStatus.OK).json({
        status: 'success',
        user,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
  private async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users = await userModel.getAllUsers();
      return res.status(ResponseStatus.OK).json({
        status: 'sucess',
        users: users,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
  
  @SendEmail()
  private async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log('inside create');
      const user = req.body;
      const result = await userModel.createUser(user);
      const [getUser] = await userModel.getUser(result?.insertId);

      console.log('before decorator');
      return res.status(ResponseStatus.CREATED).json({
        status: 'success',
        user: getUser,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
  // private async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const user = req.body;
  //     const result = await userModel.createUser(user);
  //     const [getUser] = await userModel.getUser(result?.insertId);

  //     return res.status(ResponseStatus.CREATED).json({
  //       status: 'success',
  //       user: getUser,
  //     });
  //   } catch (er: any) {
  //     return res.status(ResponseStatus.SERVER_ERROR).json({
  //       status: 'failed',
  //       error: er.message,
  //     });
  //   }
  // }

  private async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = req.body;
      const result = await userModel.updateUser(user, req.params.id);
      console.log('result', result);
      const [getUser] = await userModel.getUser(req.params.id);
      return res.status(ResponseStatus.OK).json({
        status: 'success',
        user: getUser,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }

  private async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const result = await userModel.deleteUser(req.params.id);
      if (result.affectedRows > 0)
        return res.status(ResponseStatus.OK).json({
          status: 'success',
          message: 'Record deleted successfully',
        });

      return res.status(ResponseStatus.NOT_FOUND).json({
        status: 'not found',
        message: 'No User found against this id',
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
}

// function sendMail(
//   from: any,
//   any: (params?: import('zod').RawCreateParams) => import('zod').ZodAny,
//   email: any,
//   any1: (params?: import('zod').RawCreateParams) => import('zod').ZodAny,
//   subject: any,
//   any2: (params?: import('zod').RawCreateParams) => import('zod').ZodAny,
//   arg6: any,
// ) {
//   throw new Error('Function not implemented.');
// }

// function signUpHtml(email: any): (params?: import('zod').RawCreateParams) => import('zod').ZodAny {
//   throw new Error('Function not implemented.');
// }
