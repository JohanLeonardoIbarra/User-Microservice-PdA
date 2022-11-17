import { Role } from 'Constants/Role';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private _id!: number;

  @Column('varchar', { length: 40 })
  private _name!: string;

  @Column('varchar', { length: 40 })
  private _surname!: string;

  @Column('varchar', {
    length: 40,
    unique: true,
  })
  private _email!: string;

  @Column('varchar', { length: 10 })
  private _code!: string;

  @Column('varchar')
  private _role: Role;

  @Column('varchar')
  private _password!: string;

  constructor(role: Role) {
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set surname(surname: string) {
    this._surname = surname;
  }

  get surname(): string {
    return this._surname;
  }

  set email(email: string) {
    this._email = email;
  }

  get email(): string {
    return this._email;
  }

  set code(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  get role(): Role {
    return this._role;
  }

  changeRole(role: Role) {
    this._role = role;
  }

  set password(password: string) {
    this._password = password;
  }

  get password(): string {
    return this._password;
  }
}
