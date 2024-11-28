import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/user/entities/role';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: UserDto): Promise<string> {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log(user);

    const isUserValidated = await bcrypt.compare(loginDto.password, user.password);
    if (!user || !isUserValidated) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { username: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async signup(signupDto: UserDto): Promise<any> {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(signupDto.password, salt);
  
      signupDto.password = hash;
      if(signupDto.firstname === 'Admin') {
        signupDto.role = Role.Merchant_admin;
      }
  
      const newUser = await this.userService.create(signupDto);
  
      const { password, ...result } = newUser;
  
      return {...result, token: this.jwtService.sign({ username: newUser.email, id: newUser.id, role: newUser.role })};
      
  }
}
