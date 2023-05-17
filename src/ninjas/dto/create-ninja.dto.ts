import { MinLength, IsEnum } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['Katana', 'shuruken'], { message: 'Use correct weapon!' })
  weapon: 'Katana' | 'shuruken';
}
