import { Request, Response } from 'express';
import { UserFactory } from 'Factory/UserFactory';
import bcrypt from 'bcrypt';
import AppDataSource from '../index';
import { User } from 'Entity/User';
import { Token } from 'Utils/Token';

export class UserController {
  async createStudent(request: Request, response: Response): Promise<Response> {
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
      const student = UserFactory.createStudent();

      student.name = name;
      student.surname = surname;
      student.code = code;
      student.email = email;
      student.password = bcrypt.hashSync(password, 10);

      await userRepository.save(student);

      const token = Token.create(email, code, student.role);

      return response.status(200).send({
        token,
      });
    }

    return response.sendStatus(400);
  }

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
  }
}
