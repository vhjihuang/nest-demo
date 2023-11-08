import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    console.log(data, 'create');
    return this.user.save(data);
  }

  getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 2,
      background: '#cc9966',
    });
    return captcha;
  }

  findAll(query: { keyword: string }) {
    console.log(query, 'query');
    return this.user.find({
      where: {
        name: Like(`%${query.keyword}%`),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.user.delete(id);
  }
}
