import { UserController } from 'Controller/User';
import { Router } from 'express';

const UserRouter = Router();

UserRouter.post('/', new UserController().createStudent);

export default UserRouter;
