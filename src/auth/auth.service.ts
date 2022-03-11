import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepostiory :UserRepository
  ) {}

  signUp(authCrendetialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepostiory.createUser(authCrendetialsDto);
  }

  async signIn(authCrendetialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCrendetialsDto;
    const user = await this.userRepostiory.findOne({username});

    if (user && (await bcrypt.compare(password, user.password) )) {
      return 'Login Success';
    } else {
      throw new UnauthorizedException('login Failed!');
    }
  }
}
