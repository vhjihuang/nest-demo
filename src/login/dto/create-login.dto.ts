import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10, {
    message: '用户名长度为10位',
  })
  name: string;
  @IsNumber()
  age: number;
}
