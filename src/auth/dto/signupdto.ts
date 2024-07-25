import { IsNotEmpty, IsString, IsEmail, IsBoolean } from 'class-validator';

export class SignUpDto {
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  bio: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isVerified: boolean;
}
