import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCrendetialDto: AuthCredentialsDto): Promise<void> {
    const {username, password} = authCrendetialDto;
    const user = this.create({username, password});

    try {
      await this.save(user);
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('중복된 유저 이름입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}