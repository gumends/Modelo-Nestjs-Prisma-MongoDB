import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const criar = await this.prisma.prismaClient.user.create({
      data: createUserDto
    })
    if (!criar) throw new InternalServerErrorException("Erro ao criar o usuario")
    return criar
  }

  async findAll() {
    const busca = await this.prisma.prismaClient.user.findMany()
    if (!busca) throw new InternalServerErrorException("Erro ao buscar os usuarios")
    return busca
  }

  async findOne(id: string) {
    const busca = await this.prisma.prismaClient.user.findUnique({
      where: { id }
    })
    if (!busca) throw new InternalServerErrorException("Erro ao buscar o usuario")
    return busca
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const alterar = await this.prisma.prismaClient.user.update({
      where: { id },
      data: updateUserDto
    })
    if (!alterar) throw new InternalServerErrorException("Erro ao atualizar o usuario")
    return alterar
  }

  async remove(id: string) {
    const excluir = await this.prisma.prismaClient.user.delete({
      where: {id}
    })
    if (!excluir) throw new InternalServerErrorException("Erro ao deletar usuario")
    return excluir;
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // handleCron() {
  //   console.log('Called when the current second is 10');
  // }
}
