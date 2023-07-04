import 'module-alias/register';
import 'dotenv/config';

import App from './app';
import UserController from '@/controller/user.controller';

const app = new App([new UserController()], Number(process.env.PORT));
app.listen();
