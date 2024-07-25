import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {}

  async login(dto: LoginDto): Promise<string> {
    return 'login';
  }
}
