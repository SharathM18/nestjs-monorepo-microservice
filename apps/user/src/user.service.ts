import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UpdateUserDto } from '@library/shared/dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUser(data: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(data);
    return await user.save();
  }

  // Mongoose only enforces required fields on document creation (.save(), .create() not on updates like findByIdAndUpdate().
  async updateUser(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const updateUser = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updateUser;
  }

  async deleteUser(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
  }

  async getAllUser(): Promise<UserDocument[]> {
    return await this.userModel.find({});
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }
}
