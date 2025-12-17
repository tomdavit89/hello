import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';
export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @Length(3, 10)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 2)
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
