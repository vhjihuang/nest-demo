import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Query,
  HttpCode,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: { keyword: string }) {
    console.log(query, 'keyword');
    return this.userService.findAll(query);
  }

  @Get('captcha')
  async getCaptcha(@Req() req, @Res() res, @Session() session) {
    const captchat = await this.userService.getCaptcha();
    session.code = captchat.text;
    res.type('image/svg+xml');
    res.send(captchat.data);
    // return this.userService.getCaptcha();
  }

  @Post('login')
  async login(@Body() body, @Session() session) {
    if (session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      console.log(body);
      // res.send({ status: 200 });
      return {
        status: 200,
      };
    } else {
      return {
        status: 400,
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: any) {
    console.log(query);
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    console.log(req);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  // @HttpCode(500)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
