import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';

const pepper = 'pepper-password';

export function generateHash(password: string): string {
  const saltRounds = 10;
  const salt = bcryptjs.genSaltSync(saltRounds);
  const sha512Hash = crypto
    .createHmac('sha512', pepper)
    .update(password)
    .digest('base64');

  const hashedPassword = bcryptjs.hashSync(`${sha512Hash}${salt}`, saltRounds);

  return hashedPassword;
}

export function compareHash(password: string, hash: string): boolean {
  const sha512Hash = crypto
    .createHmac('sha512', pepper)
    .update(password)
    .digest('base64');

  return bcryptjs.compareSync(`${sha512Hash}${password}`, hash);
}
