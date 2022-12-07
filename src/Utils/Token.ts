import JWT from 'jsonwebtoken';
import Config from 'Config/env';

export class Token {
  public static create(email: string, code: string, role: string): string {
    return JWT.sign({ email, code, role }, Config.secretKey, {
      expiresIn: '3h',
    });
  }

  public static verify(token: string) {
    return JWT.verify(token, Config.secretKey);
  }
}
