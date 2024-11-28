import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newUser: UserDto): Promise<User> {
    try {
      const createdUser = this.userRepository.create(newUser);
      const savedUser = await this.userRepository.save(createdUser);
      return savedUser
    } catch(error) {
      throw new InternalServerErrorException('Error fetching clients' + error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users' + error);
    }
  }

  async findOne(id: number): Promise<Partial<User>> {
    const selectedUser = await this.userRepository.findOne({
        where: { id },
        relations: ["orders"]
    });
    if (selectedUser) {
      const { password, ...cleanUser } = selectedUser;
      return cleanUser;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const selectedUser = await this.userRepository.findOne({
      where: { email },
    });
    if (selectedUser) {
      return selectedUser;
    } else {
      throw new Error();
    }
  }

  async update(id: number, userDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userRepository.update(id, userDto);
      if (updatedUser.affected === 1) {
        return this.userRepository.findOne({
          where: { id },
          relations: ['orders'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.userRepository.delete(id);
      if (deletedUser.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`user with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
