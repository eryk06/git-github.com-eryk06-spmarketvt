import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';

const pepper = 'pepper-password';

export function generateHash(password: string): string {
  const sha512Hash = crypto
    .createHmac('sha512', pepper)
    .update(password)
    .digest('base64');

  const salt = bcryptjs.genSaltSync(10);

  return bcryptjs.hashSync(sha512Hash, salt);
}

export function compareHash(password: string, hash: string): boolean {
  const sha512Hash = crypto
    .createHmac('sha512', pepper)
    .update(password)
    .digest('base64');

  return bcryptjs.compareSync(sha512Hash, hash);
}
