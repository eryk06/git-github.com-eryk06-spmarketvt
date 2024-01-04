import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
