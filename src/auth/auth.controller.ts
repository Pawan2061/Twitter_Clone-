import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { UpdateUserDto } from './dto/updateUserdto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio/interface/file.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @UseInterceptors(FileInterceptor('images'))
  signUp(@Body() dto: SignUpDto, @UploadedFile() images: Express.Multer.File) {
    console.log(images);

    return this.authService.signUp(dto, images);
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
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.removeUser(id);
  }
}
