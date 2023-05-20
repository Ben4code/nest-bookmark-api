import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';

// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: authDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const comparePwd = await argon.verify(user.hash, authDto.password);

    if (!comparePwd) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return user;
  }

  async signUp(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          firstName: true,
          lastName: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        console.table(error);
        throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('DATABASE_URL'),
    });
  }
}
