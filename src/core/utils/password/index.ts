import * as bcryptjs from 'bcryptjs';

export function generateHash(password: string): string {
  const salt = bcryptjs.genSaltSync(Math.floor(Math.random() * 10) + 1);
  return bcryptjs.hashSync(password, salt);
}

export function compareHash(password: string, hash: string): boolean {
  return bcryptjs.compareSync(password, hash);
}
