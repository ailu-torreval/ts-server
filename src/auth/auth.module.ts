import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ UserModule, PassportModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    // signOptions: { expiresIn: '60s' },
  })],  
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
