import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn() {
    return { msg: 'Sign in' };
  }

  signUp() {
    return { msg: 'Sign up' };
  }
}
