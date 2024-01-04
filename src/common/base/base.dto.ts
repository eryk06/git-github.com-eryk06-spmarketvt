import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  limit?: string;

  @IsOptional()
  @IsNumber()
  page?: string;
}
