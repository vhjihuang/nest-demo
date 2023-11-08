import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { ReqUrl, Role } from './role/role.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('guard')
@ApiTags('guard')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('role', ['admin'])
  @Role('admin')
  @ApiOperation({ summary: '获取所有守卫', description: '获取所有守卫' })
  @ApiResponse({ status: 403, description: '错误信息' })
  @ApiResponse({ status: 200, description: '调用成功' })
  findAll(@ReqUrl('1111') url: string) {
    console.log(url, 'url');
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '这是一个id', required: true, type: 'number' })
  @ApiQuery({ name: 'page', description: '页码' })
  @ApiQuery({ name: 'limit', description: '每页数量' })
  @ApiResponse({ status: 403, description: '错误信息' })
  @ApiResponse({ status: 200, description: '调用成功' })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
