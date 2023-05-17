import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signIn() {
    return { msg: 'Sign in' };
  }

  signUp() {
    return { msg: 'Sign up' };
  }
}
