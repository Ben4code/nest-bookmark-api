import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() authDto: AuthDto) {
    console.log({ dto: authDto });
    return this.authService.signUp();
  }

  @Post('signIn')
  signIn() {
    return this.authService.signIn();
  }
}
