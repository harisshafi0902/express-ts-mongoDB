import { Router } from 'express';
import UserController from '../controller/user.controller'; 

const router = Router();
const userController = new UserController();

router.use('/users', userController.router);

export default router;