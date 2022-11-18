import { UserController } from 'Controller/User';
import { Router } from 'express';

const UserRouter = Router();

UserRouter.post('/teacher', UserController.createTeacher);
UserRouter.post('/student', UserController.createStudent);
UserRouter.post('/login', UserController.login);

export default UserRouter;
