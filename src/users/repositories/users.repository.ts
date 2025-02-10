import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "../entities/user.entity";
import { Prisma } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateUserDto): Promise<UserEntity> {
        const userData: Prisma.UsersCreateInput = {
            email: data.email,
            telephone: data.telephone,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
          };

        const user = await this.prisma.users.create({ data: userData });
        return new UserEntity(user);
    }
    
    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        return user ? new UserEntity(user) : null;
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.prisma.users.findMany();
        return users.map(user => new UserEntity(user));
    }

    async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
        const userData: Prisma.UsersUpdateInput = {
          email: data.email,
          telephone: data.telephone,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          isActive: data.isActive,
        };
    
        const user = await this.prisma.users.update({
          where: { id },
          data: userData,
        });
    
        return new UserEntity(user);
      }

    async remove(id: string): Promise<void> {
        await this.prisma.users.delete({ where: { id } });
    }
}