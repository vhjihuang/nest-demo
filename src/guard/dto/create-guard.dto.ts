import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty()
  name: string;
}
