import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoUserRepository extends UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super();
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return UserMapper.toEntity(user);
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(user);
    const newUser = await this.userModel.create(data);
    return UserMapper.toEntity(newUser);
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    return UserMapper.toEntity(user);
  }
}
