import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { UpdateUserDto } from './dto/updateUserdto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Get()
  getAllUsers(): Promise<object> {
    return this.authService.getUsers();
  }

  @Public()
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Patch('/:id')
  updateInfo(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.authService.updateInfo(dto, id);
  }
  @Patch('/verify/:id')
  verifyUser(@Param('id') id: string) {
    return this.authService.verifyUser(id);
  }
}
