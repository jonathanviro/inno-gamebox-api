import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';
import { log } from 'src/common/helpers/logger.helper';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;

      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      log(`Error creating user: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }

  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      log(`Error listing users: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) {
        throw new NotFoundException(`User not found ID: ${id}`);  // Lanzamos el NotFoundException aquí
      }

      return user;
    } catch (error) {
      log(`Error searching for user with id "${id}" : ${error.message}`, 'error');

      if (error instanceof NotFoundException) {
        throw error;
      }

      handleDatabaseErrors(error);
    }
  }




  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      log(`Error updating user with id "${id}" : ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.usersRepository.remove(id);
    } catch (error) {
      log(`Error removing user with id "${id}" : ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
}
