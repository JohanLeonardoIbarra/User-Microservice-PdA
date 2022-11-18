import { Request, Response } from 'express';
import { UserFactory } from 'Factory/UserFactory';
import bcrypt from 'bcrypt';
import AppDataSource from '../index';
import { User } from 'Entity/User';
import { Token } from 'Utils/Token';

export const UserController = {
  async createStudent(request: Request, response: Response) {
    const user = UserFactory.createStudent();
    createUser(user, request, response);
  },

  async createTeacher(request: Request, response: Response) {
    const user = UserFactory.createTeacher();
    createUser(user, request, response);
  },

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if ([email, password].includes(undefined)) return response.sendStatus(400);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) return response.sendStatus(404);

    const status = bcrypt.compareSync(password, user.password);
    if (!status) return response.sendStatus(404);

    const token = Token.create(email, user.code, user.role);

    return response.status(200).send({ token });
  },
};

const createUser = async (user: User, request: Request, response: Response) => {
  const { name, surname, email, code, password, passwordConfirmation } =
    request.body;
  if (
    [name, surname, email, code, password, passwordConfirmation].includes(
      undefined
    )
  )
    return response.sendStatus(400);

  const userRepository = AppDataSource.getRepository(User);
  const userRepeated = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (userRepeated)
    return response.status(400).send({
      message: 'This user is already registered',
    });

  if (password === passwordConfirmation) {
    user.name = name;
    user.surname = surname;
    user.code = code;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);

    await userRepository.save(user);

    const token = Token.create(email, code, user.role);

    return response.status(200).send({
      token,
    });
  }

  return response.sendStatus(400);
};
