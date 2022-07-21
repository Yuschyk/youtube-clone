import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: AuthDto) {
    const user = await this.validateUser(loginData);

    return {
      user: this.returnUserFields(user),
      token: await this.issueToken(user.id),
    };
  }

  async register(registerData: AuthDto) {
    const alreadyCreatedUser = await this.userRepository.findOneBy({
      email: registerData.email,
    });
    if (alreadyCreatedUser) {
      throw new BadRequestException('Email already registered');
    }

    const salt = await genSalt(10);

    const createdUser = await this.userRepository.create({
      email: registerData.email,
      password: await hash(registerData.password, salt),
    });

    const user = await this.userRepository.save(createdUser);

    return {
      user: this.returnUserFields(user),
      token: await this.issueToken(user.id),
    };
  }

  async validateUser(loginData: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
      select: ['id', 'email', 'password'],
    });

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await compare(loginData.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Bad password');

    return user;
  }

  async issueToken(userId: number) {
    const payload = {
      id: userId,
    };
    return await this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
