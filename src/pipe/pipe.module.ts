import { Module } from '@nestjs/common';
import { PipeService } from './pipe.service';
import { PipeController } from './pipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipe } from './entities/pipe.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Pipe])],
  controllers: [PipeController],
  providers: [PipeService],
})
export class PipeModule {}
