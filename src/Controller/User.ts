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

    if (password === passwordConfirmation) {
      const student = UserFactory.createStudent();

      student.name = name;
      student.surname = surname;
      student.code = code;
      student.email = email;
      student.password = bcrypt.hashSync(password, 10);

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(student);

      const token = Token.create(email, code);

      return response.status(200).send({
        token,
      });
    }

    return response.sendStatus(400);
  }
}
