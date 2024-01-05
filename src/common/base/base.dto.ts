import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  limit?: string;

  @IsOptional()
  @IsNumber()
  page?: string;
}

export class BaseDTO {
  @IsOptional()
  @IsString()
  uuid?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
