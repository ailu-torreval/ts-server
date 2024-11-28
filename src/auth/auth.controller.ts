import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser';
import { User } from 'src/user/entities/user.entity';
import { AdminGuard } from './admin.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: UserDto) {
    return this.authService.login(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Partial<User> {
    const { password, ...result } = req.user;
    return result;
  }
  @UseGuards(AuthGuard, AdminGuard)
  @Get('admin')
  getAdminProfile(@Request() req){
    return req.user;
  }

  @Post('signup')
  signup(@Body() signupDto: UserDto) {
    return this.authService.signup(signupDto);
  }

}