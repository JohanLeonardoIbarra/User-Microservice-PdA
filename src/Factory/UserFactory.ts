import { Role } from 'Constants/Role';
import { User } from 'Entity/User';

export class UserFactory {
  public static createTeacher(): User {
    return new User(Role.Teacher);
  }

  public static createStudent(): User {
    return new User(Role.Student);
  }

  public static createAdmin(): User {
    return new User(Role.Admin);
  }
}
