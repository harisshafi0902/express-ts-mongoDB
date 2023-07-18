import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { CronJob } from 'cron';
import { emailSend } from '../services/sendemail';

export function SendEmail(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      // Call the original method
      console.log('inside decorator');

      const result = await originalMethod.apply(this, [req, res, next]);

      var job = new CronJob('* * * * *', async function () {
        console.log('You will see this message every second');
        emailSend().then((result: boolean) => {
          console.log(result);
          result ? console.log('emailsent') : console.log('email not sent');
        });
      });
      job.start();

      return result;
    };

    return descriptor;
  };
}
