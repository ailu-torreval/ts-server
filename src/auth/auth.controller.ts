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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly venueService: VenueService) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: LoginUserDto) {
    return this.authService.login(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Partial<Client> {
    const { password, ...result } = req.user;
    return result;
  }
  @UseGuards(AuthGuard, AdminGuard)
  @Get('admin')
  getMerchantProfile(@Request() req){
    return this.venueService.findAllWithInvoices();
  }

  @Post('signup')
  signup(@Body() signupDto: ClientDto) {
    return this.authService.signup(signupDto);
  }

}