import { Role } from 'Constants/Role';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar', { length: 40 })
  public name!: string;

  @Column('varchar', { length: 40 })
  public surname!: string;

  @Column('varchar', {
    length: 40,
    unique: true,
  })
  public email!: string;

  @Column('varchar', { length: 10 })
  public code!: string;

  @Column('varchar')
  public role: Role;

  @Column('varchar')
  public password!: string;

  constructor(role: Role) {
    this.role = role;
  }

  changeRole(role: Role) {
    this.role = role;
  }
}
