import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
