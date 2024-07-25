import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';

@Controller('')
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
}
