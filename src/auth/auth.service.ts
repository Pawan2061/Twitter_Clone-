import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signupdto';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/logindto';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { UpdateUserDto } from './dto/updateUserdto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(dto: SignUpDto): Promise<object> {
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const User = await this.prisma.user.findFirst({
        where: {
          username: dto.username,
        },
      });

      if (!!User) {
        return { message: `${User.username} is already signed up` };
      }
      const user = await this.prisma.user.create({
        data: {
          id: dto.id,
          email: dto.email,
          bio: dto.bio,
          password: dto.password,
          username: dto.username,
        },
      });
      await this.mailService.sendVerificationMail(user.email, user.id);

      return {
        message: {
          id: user.id,
          password: hash,
          email: user.email,
          bio: user.bio,
          username: user.username,
        },
      };
    } catch (error) {}
  }

  async login(dto: LoginDto): Promise<object> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: dto.username,
        },
      });

      if (!user) {
        throw new ForbiddenException('invalid credentials');
      }

      const payload = { sub: user.id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return error.message;
    }
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    if (!users) {
      throw new Error('NO users found ');
    }

    return {
      users: users,
    };
  }

  async getUserById(id: number): Promise<object> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      return { message: 'cannot find user' };
    }

    return {
      user: user,
    };
  }
  async updateInfo(dto: UpdateUserDto, id: number) {
    try {
      const newUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: dto.email,
          username: dto.username,
        },
      });

      return {
        message: `${newUser.username} is updated`,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  }

  async verifyUser(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          isVerified: true,
        },
      });

      return {
        message: `${user.username} is verified`,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
