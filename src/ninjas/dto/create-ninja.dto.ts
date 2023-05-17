import { MinLength, isEnum } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @isEnum(['Katana' | 'shuruken'], { message: 'Use correct weapon!' })
  weapon: 'Katana' | 'shuruken';
}
