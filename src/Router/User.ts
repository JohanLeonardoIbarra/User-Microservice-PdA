import { UserController } from 'Controller/User';
import { Router } from 'express';

const UserRouter = Router();

UserRouter.post('/', new UserController().createStudent);
UserRouter.post('/login', new UserController().login);

export default UserRouter;
