import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt';

export function hashPassword(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    const req = args[0] as Request;
    const { password } = req.body as CreateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    return originalMethod.apply(this, args);
  };
}
