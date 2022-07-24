import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";
import { UpdateUserDto } from "./dto/user.dto";
import { genSalt, hash } from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>
  ) {}

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        videos: true,
        subscriptions: {
          toUser: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async updateProfile(userId: number, userData: UpdateUserDto) {
    const user = await this.getUserById(userId);

    const isAlreadyUsedEmail = await this.userRepository.findOneBy({
      email: userData.email,
    });

    if (!isAlreadyUsedEmail && userId !== isAlreadyUsedEmail.id) {
      throw new BadRequestException("Bad email");
    }

    if (userData.password) {
      const salt = await genSalt(10);
      user.password = await hash(userData.password, salt);
    }

    user.email = userData.email;
    user.name = userData.name;
    user.description = userData.description;

    return await this.userRepository.save(user);
  }

  async subscribe(userId: number, subscriptionUserId: number) {
    const subscribeData = {
      toUser: { id: subscriptionUserId },
      fromUser: { id: userId },
    };

    const isAlreadySubscribed = await this.subscriptionRepository.findOneBy(
      subscribeData
    );

    if (!isAlreadySubscribed) {
      const newSubscription = await this.subscriptionRepository.create(
        subscribeData
      );
      await this.subscriptionRepository.save(newSubscription);
      return true;
    }
    await this.subscriptionRepository.delete(subscribeData);
    return false;
  }
}
