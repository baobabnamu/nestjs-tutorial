import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepostiory :UserRepository,
    private jwtService: JwtService
  ) {}

  signUp(authCrendetialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepostiory.createUser(authCrendetialsDto);
  }

  async signIn(authCrendetialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCrendetialsDto;
    const user = await this.userRepostiory.findOne({username});

    if (user && (await bcrypt.compare(password, user.password) )) {
      const payload = {username};
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login Failed!');
    }
  }
}
