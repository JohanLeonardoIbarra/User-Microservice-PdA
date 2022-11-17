import JWT from 'jsonwebtoken';
import Config from 'Config/env';

export class Token {
  public static create(email: string, code: string): string {
    return JWT.sign(email + code, Config.secretKey);
  }

  public static validate(token: string): boolean {
    return true;
  }
}
