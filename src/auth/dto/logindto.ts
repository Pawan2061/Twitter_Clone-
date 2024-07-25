import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
